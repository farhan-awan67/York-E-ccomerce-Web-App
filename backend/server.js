import express from "express";
const app = express();
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/products.route.js";

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

const PORT = process.env.PORT || 3000;

//endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.get("/", (req, res) => {
  res.send("hello World");
});

app.listen(PORT, () => {
  connectDB();
  connectCloudinary();
  console.log(`Server listening on ${PORT}`);
});
