const jwt = require("jsonwebtoken");

const secret = "compaMeGustaSuVieja"; //Es importante porque es donde va encriptar el header y el payload
//No va a en el codigo sino enn una variable de entorno

const payload = {
  sub: 1,//Es parte del estandar, aqui voy a identificar el usuario
  // scope: "",// se usa aveces para los permisos
  role: "customer"
}

function signToken(payload, secret)
  {
    return jwt.sign(payload, secret, {expiresIn: "7d"});
  }

const token = signToken(payload, secret);

console.log(token);

