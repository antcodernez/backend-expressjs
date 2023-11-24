const Joi = require("joi");

const id = Joi.number();
const product = Joi.string().min(3).max(40);

const createOrdersSchema = Joi.object({
  productName: product.required()
});

const getOrdersSchema = Joi.object({
  id: id.required(),
});

const updateOrdersSchema = Joi.object({
  productName: product
});

module.exports = {createOrdersSchema, getOrdersSchema, updateOrdersSchema}
