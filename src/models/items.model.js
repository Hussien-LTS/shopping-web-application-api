"use strict";

const mongoose = require("mongoose");
const Joi = require("joi");

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemDesc: { type: String, required: true },
  itemImg: { type: String, required: true },
  comments:[{ type: mongoose.Schema.Types.ObjectId,
  ref: "comments"}]
});

const ItemSchema = mongoose.model("items", itemSchema);
const validateItems = (itemData) => {
  const schema = Joi.object({
    itemName: Joi.string().required().label("itemName"),
    itemDesc: Joi.string().required().label("itemDesc"),
    itemImg: Joi.string().required().label("itemImg"),
  });
  return schema.validate(itemData);
};

module.exports = { ItemSchema, validateItems };
