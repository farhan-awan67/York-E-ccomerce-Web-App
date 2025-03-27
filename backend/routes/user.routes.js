import express from "express";
const userRouter = express.Router();
import { adminLogin, login, register } from "../controllers/userController.js";

//routes
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/admin", adminLogin);

export default userRouter;
