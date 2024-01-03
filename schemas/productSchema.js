// DTO data transfer object o schema se pueden llamar asi
// Su responsabilidad es validar la data que me esta llegando desde el cliente
const Joi = require("joi");
//crearemos un schema especifico para cada campo me ayuda a reutilizar mejor y usar el codigo en las actualizaciones y la creacion

const id = Joi.number().integer();
const name = Joi.string().min(3).max(20);
const price = Joi.number().integer().positive().min(10);
const price2 = Joi.number().integer().positive();
const description = Joi.string().min(10);
const img = Joi.string().uri();
const categoryId =  Joi.number().integer();

const limit = Joi.number().integer();
const offset =  Joi.number().integer();

const price_min = Joi.number().integer();
const price_max =  Joi.number().integer();

//Arriba: validaciones

//creando un schema para la validacion, reunira todos los campos
const createProductSchema = Joi.object({
  //aqui pongo si es requerido o no un cambio
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image:img.required(),
  categoryId: categoryId.required()
});


const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: img,
  description: description,
  categoryId //Asignando un valor con la sintaxis corta
});

//Validacion del get de un producto

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price: price2,
  price_min: price_min,
  price_max: price_max.greater(Joi.ref('price_min')),
}).with('price_min', 'price_max')
  .with('price_max', 'price_min');


module.exports =
  {
    createProductSchema,
    updateProductSchema,
    getProductSchema,
    queryProductSchema
  }
