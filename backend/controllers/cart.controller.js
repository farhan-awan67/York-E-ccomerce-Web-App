import User from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//add to cart
export const addToCart = asyncHandler(async (req, res) => {
  const { userId, productId, size } = req.body;

  const user = await User.findById(userId);
  let cartData = await user.cartData;

  if (cartData[productId]) {
    if (cartData[productId][size]) {
      cartData[productId][size] += 1;
    } else {
      cartData[productId][size] = 1;
    }
  } else {
    cartData[productId] = {};
    cartData[productId][size] = 1;
  }
  await User.findByIdAndUpdate(userId, { cartData });
  res.json({ success: true, message: "Added to cart" });
});

//update cart
export const updateCart = asyncHandler(async (req, res) => {
  const { userId, itemId, size, quantity } = req.body;
  const user = await User.findById(userId);
  let cartData = await user.cartData;

  cartData[itemId][size] = quantity;
  await User.findByIdAndUpdate(userId, { cartData });
  res.json({ success: true, message: "Cart updated" });
});

//get cart data
export const getCart = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  const cartData = await user.cartData;

  res.json({ success: true, cartData });
});
