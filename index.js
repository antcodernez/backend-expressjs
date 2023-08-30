// Creamos la app
const express = require("express");
const app = express(); // ejecutamos express como metodo dato que es un metodo constructor
const port = 9222; // donde quiero que corra mi app

// Usamos la app

app.get('/', (req, res) => {
    res.send("Hola mi server en express papus");
});

app.get("/nueva-ruta", (req, res) => {
  res.send("Hola papus soy una nueva ruta en el servidor");
})
app.get("/productos", (req, res) => {
  res.json({
    name: "calcetines",
    price: 1290
  }); //Lo que mas vamos a enviar es un json porque voy a crear una api
});
app.get("/home", (req, res) => {
  res.json({
    text: "Soy un index",
    oferts: [{
        name: "Calcetines",
        price: 120
      },
      {
        name: "pelos",
        price: 1210
      }]
  });
});

app.listen(port, () => {
  console.log(`Ya estoy funcionando master en el puerto ${port}`);
});
