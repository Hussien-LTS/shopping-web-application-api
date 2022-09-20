"use strict";

const mongoose = require("mongoose");
const Joi = require("joi");

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  
});

const CommentSchema = mongoose.model("comments", commentSchema);
const validateComments = (commentSchema) => {
  const schema = Joi.object({
    comment: Joi.string().required().label("itemName"),
   
  });
  return schema.validate(commentSchema);
};

module.exports = { CommentSchema, validateComments };
