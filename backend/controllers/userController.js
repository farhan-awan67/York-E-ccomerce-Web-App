import User from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const assignToken = (id) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET_expireIn,
  });
};

export const register = async (req, res) => {
  let token;
  try {
    const { name, email, password } = req.body;
    //checking values
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }
    //checking existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already existed" });
    }
    //creating new user
    const newUser = new User({ name, email, password });
    if (newUser) {
      token = assignToken(newUser._id);
    }
    const user = await newUser.save();
    res.json({
      success: true,
      message: "user created successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //checking email and password is entered
  if (!email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }
  //checking user with email
  const existUser = await User.findOne({ email });
  const correct = await existUser.comparePassword(password);
  let token;
  //if password is correct
  if (correct) {
    token = assignToken(existUser._id);
    res.json({
      success: true,
      message: "Login Successfully",
      token,
      existUser,
    });
  } else {
    res.json({ success: false, message: "Incorrect Email or Password" });
  }
  //setting token in cookie
  res.cookie("token", token, {
    httpOnly: true, // Prevents JavaScript access to the cookie (helps mitigate XSS attacks)
    secure: process.env.NODE_ENV === "production", // Ensures cookie is only sent over HTTPS in production
    // sameSite: "Strict", // Helps prevent CSRF attacks by restricting cookie sending to same-site requests
    maxAge: 7 * 24 * 60 * 60 * 1000, // Expiration time in milliseconds (e.g., )
  });
});

//admin login
export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(email + password, process.env.JWT_SECRET);
    res.json({ success: true, message: "Login successfull", token });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentiols" });
  }
});
