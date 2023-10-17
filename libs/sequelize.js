const { Sequelize } = require("sequelize");

const {config} = require("../config/config");
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: "postgres",
}); // el va a usar el pooling por detras


module.exports = sequelize;
