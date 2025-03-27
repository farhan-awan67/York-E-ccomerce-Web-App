import express from "express";
const cartRouter = express.Router();
import {
  getCart,
  updateCart,
  addToCart,
} from "../controllers/cart.controller.js";
import { auth } from "../middlewares/auth.js";

cartRouter.post("/get", auth, getCart);
cartRouter.post("/update", auth, updateCart);
cartRouter.post("/add", auth, addToCart);

export default cartRouter;
