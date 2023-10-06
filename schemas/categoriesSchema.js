const Joi = require("joi");

const id = Joi.string().uuid();
const name = Joi.string().min(4).max(30);

const createCategorieSchema = Joi.object({
  name: name.required()
});

const getCategorieSchema = Joi.object({
  id: id.required()
});

const updateCategoriesSchema = Joi.object({
  name: name
});


module.exports = {createCategorieSchema, getCategorieSchema, updateCategoriesSchema};
