const express = require("express");
const userRouter = express.Router();
const cookieParser = require("cookie-parser");

const {registerUser,loginUser,logoutUser} = require("../controllers/user.controller");

userRouter.use(express.json());
userRouter.use(cookieParser());
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.delete("/logout", logoutUser);

module.exports={
    userRouter
}