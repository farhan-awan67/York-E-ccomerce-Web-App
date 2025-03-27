import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

export const auth = asyncHandler(async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "invalid credentiols" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.body.userId = decoded.userId;
  next();
});
