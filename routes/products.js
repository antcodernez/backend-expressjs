// Aqui van todas las rutas que van a ir con productos

const express = require("express");
const {faker} = require("@faker-js/faker"); //Libreria para simular datos nueva

const router = express.Router();

//Lo que mas vamos a enviar es un json porque voy a crear una api
//endpoint de productos, ahora usando la librearia faker estamos creando un query parameter de size para traer productos, el default es 10, pero puedo traer n cantidad

// Se borraron los endpoints de productos y se dejaron las partes especializadas
router.get("/", (req, res) => {

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
router.get("/filter", (red, res) => {
    res.send("Yo soy un filter");
});


//endpont para recibir o devolder el detalle de un producto recibiendo el id
//Al momento de crearlo, los dos puntitos : significan que es un parametro
router.get("/:id", (req, res) => {
    const { id }= req.params; //recogemos el id que me estan enviando y lo vamos a enviar el la respuesta, eso viene el request(req)
    if(id > 999) //Todos los parametros que se envian en el get, se envian como string, entonces debo asegurarme de definir que sea un string(aunque aqui funciona, debe ser por el debil tipado)
      {
        res.status(404).json({
          message: `El ID ${id} que solicitaste no se encuentra rey`
        });
      }
    else
      {
        res.status(200).json({
          id,
          name: faker.commerce.productName(),
          price: faker.commerce.price(),
          details: "You will be awesome with this"
        });
      }
})

router.post("/", (req, res) => {
    const body = req.body;
    res.status(201).json({
      message: "Todo se guardo muy bien master",
      data: body
    });
  })

router.patch("/:id", (req, res) => {
    const body = req.body;
    const {id} = req.params;
    res.json({
      message: "Todo se actualizo muy bien master",
      data: body,
      id
    });
  })

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    res.json({
      message: "Se elimino bien master",
      id
    });
  })

//Lo hacemos un modulo exportable
module.exports = router;
