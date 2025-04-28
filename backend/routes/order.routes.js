import express from "express";
const orderRoutes = express.Router();
import {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyStripe,
} from "../controllers/order.controller.js";
import { auth } from "../middlewares/auth.js";
import adminAuth from "../middlewares/adminAuth.js";

//admin routes
orderRoutes.post("/list", adminAuth, allOrders);
orderRoutes.post("/status", adminAuth, updateStatus);

//payment features
orderRoutes.post("/place", auth, placeOrder);
orderRoutes.post("/stripe", auth, placeOrderStripe);
orderRoutes.post("/razorpay", auth, placeOrderRazorpay);

//user features
orderRoutes.post("/userorder", auth, userOrders);

//verify stripe
orderRoutes.post("/verifyStripe", auth, verifyStripe);

export default orderRoutes;
