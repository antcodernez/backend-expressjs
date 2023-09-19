// Aqui van todas las rutas que van a ir con productos

const express = require("express");

const ProductService = require(`../services/productsService`);//Importanto mi servicio creado

const service = new ProductService();//Instanciar mi clase de servicio de productos

const router = express.Router();

router.get("/", async (req, res) => {
  const {limit} = req.query;
    if(limit != undefined)
      {
        const products = await service.find(limit);
        res.json(products);
      }
    else
      {
        const products = await service.find();
        res.json(products);
      }
});

//Todo lo que es especifico debe ir antes de todo lo que es dinamico, en este caso los endpoints de filter y :id no chocan porque antes esta filter, que id pero si filter lo bajaramos antes de /products/:id me retornaria filter como un id y chocarian los endpoints de la api
router.get("/filter", (red, res) => {
    res.send("Yo soy un filter");
});

//endpont para recibir o devolder el detalle de un producto recibiendo el id
//Al momento de crearlo, los dos puntitos : significan que es un parametro
router.get("/:id", async (req, res) => {
    const { id }= req.params; //recogemos el id que me estan enviando y lo vamos a enviar el la respuesta, eso viene el request(req)
    const product = await service.findOne(id);

    if("string" == typeof product)
      {
        res.status(404).json(product);
      }
    else
      {
        res.status(200).json(product);
      }
})

router.post("/", async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  })

router.patch("/:id", async (req, res) => {
    try
      {
        const body = req.body;
        const {id} = req.params;
        const product = await service.update(id, body);
        res.json(product);
      }
    catch (error)
      {
        res.status(404).json({
          message: error.message // .message es una propiedad del objeto error, ademas ese mensaje viene desde el servicio y se esta mostrando
        })
      }
  })

router.put("/:id", async (req, res) => {
    const body = req.body;
    const {id} = req.params;
    const product = await service.update(id, body);
    res.json(product);
  });

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    const response = await service.delete(id);
    res.status(200).json(response);
  });

//Lo hacemos un modulo exportable
module.exports = router;
