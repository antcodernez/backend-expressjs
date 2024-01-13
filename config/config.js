require("dotenv").config(); //Va a leer las configuraciones de mi archivo .env y esas configuraciones las va a cargar en el proceso de node

const config = {
  env: process.env.NODE_ENV || "dev",
  port: process.env.PORT || 9222,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  mysqlDB: process.env.MYSQLDATABASE,
  mysqlUser: process.env.MYSQLUSER,
  mysqlPassword: process.env.MYSQLPASSWORD
}

module.exports = {config};
