const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const image = Joi.string().uri();

const createCategorieSchema = Joi.object({
  name: name.required(),
  image: image.required()
});

const getCategorieSchema = Joi.object({
  id: id.required(),
});

const updateCategoriesSchema = Joi.object({
  name: name,
  image: image
});


module.exports = {createCategorieSchema, getCategorieSchema, updateCategoriesSchema};
