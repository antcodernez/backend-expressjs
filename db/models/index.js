//Este archivo se va a encargar de enviar la conexion hacia los modelos
//Estara la configuracion inicial y el set up con los modelos
const {User, UserSchema } = require("./user.model");
const {Product, ProductSchema} = require("./product.model");
const {Category, CategorySchema} = require("./categorie.model")
const {Order, OrderSchema} = require("./order.model");
const {Customer, CustomerSchema} = require("./customer.model");
const {OrderProduct, OrderProductSchema} = require("./order-product.model");


//Vamos a crear una funcion, tiene como parametro la conexion a la bd

function setupModels(sequelize)
  {
    //Aqui van las configuraciones iniciales de cada modelo

    // Una vez recibe la conexion voy al modelo y le digo que haga un init,le estoy diciendo que el modelo debe de tener este schema y despues le digo la configuracion
    User.init(UserSchema, User.config(sequelize));
    // recibe como parametro el schema y seguido la configuracion que es un metodo estatico sin necesidad de una instancia
    Category.init(CategorySchema, Category.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Order.init(OrderSchema, Order.config(sequelize));
    OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

    //Las relaciones se ejecutan despues de correr los modelos
    //One to one
    User.associate(sequelize.models);
    Customer.associate(sequelize.models);
    // One to many
    Category.associate(sequelize.models);
    Product.associate(sequelize.models);
    Order.associate(sequelize.models);
    //many to many
    
  }

module.exports = setupModels;
