const Joi = require('joi');
const { createUserSchema, updateUserSchema} = require('./usersSchema');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone =  Joi.string();
// const userId = Joi.number().integer();
// const email = Joi.string().email();
// const password =  Joi.string();

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  updateUserSchema
});

module.exports = { getCustomerSchema, createCustomerSchema, updateCustomerSchema };
