const jwt = require("jsonwebtoken");

const secret = "compaMeGustaSuVieja"; //Es importante porque es donde va encriptar el header y el payload
//No va a en el codigo sino enn una variable de entorno

function signToken(token, secret)
  {
    return jwt.verify(token, secret);
  }
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcwNTE3MTg2OSwiZXhwIjoxNzA1Nzc2NjY5fQ.7lWMy3q6fhpUrij2tE_0uw5QHua3qIyelBDQ1b_7mKk"
const payload = signToken(token, secret);

console.log(payload);

