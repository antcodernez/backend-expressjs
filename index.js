// Creamos la app
const express = require("express");
const {faker} = require("@faker-js/faker"); //Libreria para simular datos nueva

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
//endpoint de productos, ahora usando la librearia faker estamos creando un query parameter de size para traer productos, el default es 10, pero puedo traer n cantidad
app.get("/products", (req, res) => {

  const products = [];
  const {size} = req.query;
  const limit = size || 10;

  for(let i = 0; i < limit; i++)
    {
      products.push(
        {
          id: i,
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price()),
          image: faker.image.url(),
        });
    }
  res.json(products);
});

//Todo lo que es especifico debe ir antes de todo lo que es dinamico, en este caso los endpoints de filter y :id no chocan porque antes esta filter, que id pero si filter lo bajaramos antes de /products/:id me retornaria filter como un id y chocarian los endpoints de la api
app.get("/products/filter", (red, res) => {
    res.send("Yo soy un filter");
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
//Ejemplo de consultas de parametros query
app.get("/users", (req, res) => {
  const { limit, offset } = req.query; // asi voy a tener obtener los parametros que vengas desde query
  if(limit || offset)
    {
      res.json({
        limit,
        offset
      })
    }
  else
    {
      res.send("No hay parametros");
    }
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

