// Aqui van todas las rutas que van a ir con productos

const express = require("express");

const ProductService = require(`../services/productsService`);//Importanto mi servicio creado

const service = new ProductService();//Instanciar mi clase de servicio de productos

const router = express.Router();

router.get("/", (req, res) => {
  const products = service.find();
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
    const product = service.findOne(id);
    res.json(product);
})

router.post("/", (req, res) => {
    const body = req.body;
    const newProduct = service.create(body);
    res.status(201).json(newProduct);
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

router.put("/:id", (req, res) => {
    const body = req.body;
    res.json({
      data: body
    })
  });

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    res.json({
      message: "Se elimino bien master",
      id
    });
  })

//Lo hacemos un modulo exportable
module.exports = router;
