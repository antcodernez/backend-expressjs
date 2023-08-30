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

//Lo que mas vamos a enviar es un json porque voy a crear una api
//endpoint de productos
app.get("/products", (req, res) => {
  res.json([
    {
      id: 1,
      name: "underwear",
      products: [{
        id: 1,
        name: "calcetines",
        price: 120,
        details: "It's very nice to used"
      },
      {
        id: 2,
        name: "t-shirt",
        price: 300,
        details: "You will be awesome with this"
      },
      {
        id: 3,
        name: "underwear",
        price: 3001,
        details: "You will be too hot with this"
      },
      {
        id: 4,
        name: "Dress",
        price: 524,
        details: "You will be very sexy"
      }]
    },
    {
      id: 2,
      name: "girls",
      products: [{
        id: 1,
        name: "calcetines",
        price: 120,
        details: "It's very nice to used"
      },
      {
        id: 2,
        name: "t-shirt",
        price: 300,
        details: "You will be awesome with this"
      },
      {
        id: 3,
        name: "underwear",
        price: 3001,
        details: "You will be too hot with this"
      },
      {
        id: 4,
        name: "Dress",
        price: 524,
        details: "You will be very sexy"
      }]
    },
    {
      id: 2,
      name: "boys",
      products: [{
        id: 1,
        name: "calcetines",
        price: 120,
        details: "It's very nice to used"
      },
      {
        id: 2,
        name: "t-shirt",
        price: 300,
        details: "You will be awesome with this"
      },
      {
        id: 3,
        name: "underwear",
        price: 3001,
        details: "You will be too hot with this"
      },
      {
        id: 4,
        name: "Dress",
        price: 524,
        details: "You will be very sexy"
      }]
    }
  ]);
});


//endpont para recibir o devolder el detalle de un producto recibiendo el id
//Al momento de crearlo, los dos puntitos : significan que es un parametro
app.get("/products/:id", (req, res) => {
    const { id }= req.params; //recogemos el id que me estan enviando y lo vamos a enviar el la respuesta, eso viene el request(req)

    res.json({
      id,
      name: "t-shirt",
      price: 300,
      details: "You will be awesome with this"
    });
})

//endpoint con dos parametros
app.get("/categories/:categoryId/products/:productId", (req, res) => {
    const {categoryId, productId} = req.params;
    res.json({
        categoryId,
        productId
      });
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
      }],

  });
});

app.get("/user/:id", (req, res) =>{
  const {id} = req.params;
  res.json({
    id,
  })
});

app.listen(port, () => {
  console.log(`Ya estoy funcionando master en el puerto ${port}`);
});

