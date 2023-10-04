const Joi = require("joi");

const id = Joi.string().uuid();
const price = Joi.number().min(10);
const name = Joi.string().min(3).max(40);

const createOrdersSchema = Joi.object({
  name: name.required(),
  price: price.required(),
});

const getOrdersSchema = Joi.object({
  id: id.required(),
});

const updateOrdersSchema = Joi.object({
  name: name,
  price: price
});

module.exports = {createOrdersSchema, getOrdersSchema, updateOrdersSchema}
