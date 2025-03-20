import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const adminAuth = asyncHandler(async (req, res, next) => {
  const token = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }
  next();
});
