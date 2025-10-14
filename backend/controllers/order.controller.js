import { asyncHandler } from "../utils/asyncHandler.js";
import Order from "../models/orders.model.js";
import User from "../models/userModel.js";
import Stripe from "stripe";

//global variable
const currency = "Pkr";
const deliveryCharge = 50;

//stripe configuration
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//order list admin
export const allOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.json({ success: true, orders });

  if (!orders) {
    return res.json({ success: false, message: "invalid credentiols" });
  }
});

//order status
export const updateStatus = asyncHandler(async (req, res) => {
  const { orderId, status } = req.body;

  await Order.findByIdAndUpdate(orderId, { status });
  res.json({ success: true, message: "status updated" });
});

//order through payment
export const placeOrder = asyncHandler(async (req, res) => {
  const { userId, items, address, amount } = req.body;

  const orderData = {
    userId,
    items,
    address,
    amount,
    paymentMethod: "COD",
    date: Date.now(),
  };

  const newOrder = new Order(orderData);
  await newOrder.save();

  const user = await User.findByIdAndUpdate(userId, { cartData: {} });

  res.json({ success: true, message: "Order placed", orders: newOrder });
});

//order through stripe
export const placeOrderStripe = asyncHandler(async (req, res) => {
  const { userId, items, address, amount } = req.body;
  const { origin } = req.headers;

  const orderData = {
    userId,
    items,
    address,
    amount,
    paymentMethod: "Stripe",
    date: Date.now(),
  };

  const newOrder = new Order(orderData);
  await newOrder.save();

  const line_items = items.map((item) => ({
    price_data: {
      currency: currency,
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  line_items.push({
    price_data: {
      currency: currency,
      product_data: {
        name: "Deliver Charges",
      },
      unit_amount: deliveryCharge * 100,
    },
    quantity: 1,
  });

  //this will give us url
  const session = await stripe.checkout.sessions.create({
    success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    line_items,
    mode: "payment",
  });

  res.json({ success: true, session_url: session.url });
});

//verify stripe
export const verifyStripe = asyncHandler(async (req, res) => {
  const { userId, success, orderId } = req.body;
  if (success === "true") {
    await Order.findByIdAndUpdate(orderId, { payment: true });
    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true });
  } else {
    await Order.findByIdAndDelete(orderId);
    res.json({ success: false });
  }
});

//order through razorpay
export const placeOrderRazorpay = asyncHandler(async (req, res) => {});

//user orders
export const userOrders = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const orders = await Order.find({ userId });
  res.json({ success: true, orders });
});
