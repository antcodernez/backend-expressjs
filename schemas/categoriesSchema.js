const Joi = require("joi");

const id = Joi.number();
const name = Joi.string().min(3).max(30);

const createCategorieSchema = Joi.object({
  name: name.required()
});

const getCategorieSchema = Joi.object({
  id: id
});

const updateCategoriesSchema = Joi.object({
  name: name
});


module.exports = {createCategorieSchema, getCategorieSchema, updateCategoriesSchema};
