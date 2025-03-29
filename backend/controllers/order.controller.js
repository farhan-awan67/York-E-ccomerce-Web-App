import { asyncHandler } from "../utils/asyncHandler.js";
import Order from "../models/orders.model.js";
import User from "../models/userModel.js";

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
export const placeOrderStripe = asyncHandler(async (req, res) => {});

//order through razorpay
export const placeOrderRazorpay = asyncHandler(async (req, res) => {});

//user orders
export const userOrders = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const orders = await Order.find({ userId });
  console.log(orders);
  res.json({ success: true, orders });
});
