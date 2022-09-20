"use strict";
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes/user.router");
const itemRouter = require("./routes/itemRoutes/item.router");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/v1", userRouter);
app.use("/v1", itemRouter);
app.get("/", (req, res) => {
  res.send("hello");
});

app.get("*", (req, res) => {
  res.status(404).send("page not found");
});
module.exports = app;
