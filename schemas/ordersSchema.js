const Joi = require("joi");

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderState = Joi.string().valid('entregado', 'enviado', 'pendiente');

const createOrdersSchema = Joi.object({
  customerId: customerId.required(),
  orderState: orderState
});

const getOrdersSchema = Joi.object({
  id: id.required(),
});

const updateOrdersSchema = Joi.object({
  orderState
});

module.exports = {createOrdersSchema, getOrdersSchema, updateOrdersSchema}
