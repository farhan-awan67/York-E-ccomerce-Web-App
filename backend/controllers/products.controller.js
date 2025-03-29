import { v2 as cloudinary } from "cloudinary";
import Products from "../models/prouductModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//add product
export const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, subCategory, sizes, bestSeller } =
    req.body;

  const image1 = req.files.image1 && req.files.image1[0];
  const image2 = req.files.image2 && req.files.image2[0];
  const image3 = req.files.image3 && req.files.image3[0];
  const image4 = req.files.image4 && req.files.image4[0];
  const images = [image1, image2, image3, image4].filter(
    (item) => item !== undefined
  );
  const imageUrl = await Promise.all(
    images.map(async (item) => {
      let result = await cloudinary.uploader.upload(item.path, {
        resource_type: "image",
      });
      return result.secure_url;
    })
  );

  const productData = {
    name,
    description,
    price: Number(price),
    category,
    subCategory,
    image: imageUrl,
    sizes: JSON.parse(sizes),
    bestSeller: bestSeller === "true" ? true : false,
    date: Date.now(),
  };
  //creating product
  const newProduct = new Products(productData);
  await newProduct.save();
  res.json({ success: true, message: "Product Added", product: newProduct });
});

//list products
export const listProducts = asyncHandler(async (req, res) => {
  const products = await Products.find({});
  res.json({ success: true, message: "products", products });
});

//single product
export const singleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Products.findById(id);
  res.json({ success: true, message: "product", data: product });
});

//remove product
export const removeProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const removedProduct = await Products.findByIdAndDelete(id);
  if (!removedProduct) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  res.json({ success: true, message: "Product deleted", data: removedProduct });
});
