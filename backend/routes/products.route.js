import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/products.controller.js";
import upload from "../middlewares/multer.js";
import admninAuth from "../middlewares/adminAuth.js";
const productRouter = express.Router();

productRouter.post(
  "/add",
  admninAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.get("/products", listProducts);
productRouter.post("/single-product/:id", singleProduct);
productRouter.delete("/remove/:id", removeProduct);

export default productRouter;
