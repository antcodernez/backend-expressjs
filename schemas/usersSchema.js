const Joi = require("joi");

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const phone = Joi.string().min(10).max(12);
const gender = Joi.string().min(1);


const createUserSchema = Joi.object({
  name: name.required(),
  phone: phone.required(),
  gender: gender.required()
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  phone: phone,
  gender: gender
});


module.exports = {createUserSchema, getUserSchema, updateUserSchema};
