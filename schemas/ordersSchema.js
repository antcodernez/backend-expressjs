const Joi = require("joi");

const id = Joi.string().uuid();
const price = Joi.number().min(10);
const product = Joi.string().min(3).max(40);

const createOrdersSchema = Joi.object({
  product: product.required(),
  price: price.required(),
});

const getOrdersSchema = Joi.object({
  id: id.required(),
});

const updateOrdersSchema = Joi.object({
  product: product,
  price: price
});

module.exports = {createOrdersSchema, getOrdersSchema, updateOrdersSchema}
