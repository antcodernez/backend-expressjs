const { Pool } = require("pg");
const {config} = require("../config/config");

//Vamos a proteger las variables con encodeURIComponent y compraremos
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//aqui vamos a crear la URI de conexion
//Priemero va el protocolo, luego el usuario y contraseña luego el dbhost y el puerto por ultimo el nombre de la bd a la que me quiero conectar

// const pool = new Pool({
//   host: "localhost",
//   port: 5432,
//   user: "yisus",
//   password: "lolitoxd28",
//   database: "my_store"
// });

const pool = new Pool({connectionString: URI});
//Así queda mejor a la hora de conectarme a una bd remota y no de forma local como en docker, si ya tenemos una bd de forma remota lo más normal es tener la URI


module.exports = pool;
