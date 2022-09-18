const express = require("express");

const {
  httpRegisterUserHandler,
  httpLoginUserHandler,
} = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/register", httpRegisterUserHandler);
userRouter.post("/login", httpLoginUserHandler);

module.exports = userRouter;
