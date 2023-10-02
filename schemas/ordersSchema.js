const Joi = require("joi");

const id = Joi.string().uuid();
const price = Joi.number().min(10);
const name = Joi.string().min(3).max(40);

