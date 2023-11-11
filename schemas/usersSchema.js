const Joi = require("joi");

const id = Joi.number();
// const name = Joi.string().min(3).max(20);
// const phone = Joi.string().min(10).max(12);
// const gender = Joi.string().min(1);
const email = Joi.string().email();
const password = Joi.string().min(8);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required()
  // name: name.required(),
  // phone: phone.required(),
  // gender: gender.required()
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
  // gender: gender,
  // isBlock: Joi.boolean()
});


module.exports = {createUserSchema, getUserSchema, updateUserSchema};
