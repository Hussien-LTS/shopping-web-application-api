"use strict";
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const api = require("./routes/api");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/v1", api);
app.get("/", (req, res) => {
  res.send("hello");
});

app.get("*", (req, res) => {
  res.status(404).send("page not found");
});
module.exports = app;
