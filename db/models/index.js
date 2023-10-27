//Este archivo se va a encargar de enviar la conexion hacia los modelos
//Estara la configuracion inicial y el set up con los modelos
const {User, UserSchema } = require("./user.model");
const {Product, ProductSchema} = require("./product.model");
const {Categorie, CategorieSchema} = require("./categorie.model")

//Vamos a crear una funcion, tiene como parametro la conexion
function setupModels(sequelize)
{
  //Aqui van las configuraciones iniciales de cada modelo

  // Una vez recibe la conexion voy al modelo y le digo que haga un init,le estoy diciendo que el modelo debe de tener este schema y despues le digo la configuracion
  User.init(UserSchema, User.config(sequelize));
  // recibe como parametro el schema y seguido la configuracion que es un metodo estatico sin necesidad de una instancia
  Product.init(ProductSchema, Product.config(sequelize));
  Categorie.init(CategorieSchema, Categorie.config(sequelize));
}
module.exports = setupModels;
