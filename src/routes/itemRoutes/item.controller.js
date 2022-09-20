"use strict";
const { ItemSchema, validateItems } = require("../../models/items.model");

const httpAddItemHandler = async (req, res) => {
  const { error } = validateItems(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    console.log("req.body====>", req.body);
    const result = await ItemSchema.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};


const httpGetItemsHandler = async (req, res) => {
  try {
    const options = {
      _id: 1,
      __v: 0,
    };
    const results = await ItemSchema.find({}, options);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};


const httpGetItemByIdHandler = async (req, res) => {
  try {
    const id = req.params._id;
    const query = { _id: id };
    const options = {
      _id: 0,
      __v: 0,
    };
    const results = await ItemSchema.findOne(query, options);
    res.status(201).json(results);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};


const httpUpdateItemHandler = async (req, res) => {
  try {
    const id = req.params._id;
    const query = { _id: id };
    console.log(req.body);
    console.log(id);
    const options = {
      $set: {
        itemName: req.body.itemName,
        itemDesc: req.body.itemDesc,
        itemImg: req.body.itemImg,
      },
    };
    await ItemSchema.findOneAndUpdate(query, options);
    const results = await ItemSchema.findOne(query, {
      _id: 0,
      __v: 0,
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};


const httpDeleteItemHandler = async (req, res) => {
  try {
    const id = req.params._id;
    const query = { _id: id };
  
     await ItemSchema.findByIdAndDelete(query);
    res.status(200).json({ message: "Deleted"});
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
};



module.exports = {
  httpAddItemHandler,
  httpGetItemsHandler,
  httpGetItemByIdHandler,
  httpUpdateItemHandler,
  httpDeleteItemHandler
};
