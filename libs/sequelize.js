const { Sequelize } = require("sequelize");
const {config} = require("../config/config");
const setupModels = require("../db/models");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: "postgres",
}); // el va a usar el pooling por detras

//se corre despues de crear la instancia
setupModels(sequelize);

sequelize.sync() //Va a hacer una sincronizacion; va a tomar los modelos y va a crear la estructura

module.exports = sequelize;
