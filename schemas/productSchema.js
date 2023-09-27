// DTO data transfer object o schema se pueden llamar asi
// Su responsabilidad es validar la data que me esta llegando desde el cliente
const Joi = require("joi");
//crearemos un schema especifico para cada campo me ayuda a reutilizar mejor y usar el codigo en las actualizaciones y la creacion

const id = Joi.string().uuid();
// tipo de campo que es string() y luego la validacion uuid()
const name = Joi.string().alphanum().min(3).max(20);

const price = Joi.number().integer().min(10);

//Arriba: validaciones

//creando un schema para la validacion, reunira todos los campos
const createProductSchema = Joi.object({
  //aqui pongo si es requerido o no un cambio
  name: name.required(),
  price: price.required()
});


const updateProductSchema = Joi.object({
  name: name,
  price: price
});

//Validacion del get de un producto


const getProductSchema = Joi.object({
  id: id.required(),
});


module.exports =
  {
    createProductSchema,
    updateProductSchema,
    getProductSchema
  }
