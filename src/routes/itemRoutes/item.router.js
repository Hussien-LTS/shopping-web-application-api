const express = require("express");

const {
  httpAddItemHandler,
  httpGetItemsHandler,
  httpGetItemByIdHandler,
  httpUpdateItemHandler,
  httpDeleteItemHandler,
} = require("./item.controller");

const itemRouter = express.Router();

itemRouter.post("/items", httpAddItemHandler);
itemRouter.get("/items", httpGetItemsHandler);
itemRouter.get("/items/:_id", httpGetItemByIdHandler);
itemRouter.put("/items/:_id", httpUpdateItemHandler);
itemRouter.delete("/items/:_id", httpDeleteItemHandler);
// itemRouter.post("/items/:_id/comment", httpAddHandler);

module.exports = itemRouter;
