const express = require("express");
const {faker} = require("@faker-js/faker");
const router = express.Router();

router.get("/", (req, res) => {
  const productsRandom = [];
  const numberOrders = parseInt(Math.random() * (11 - 1) + 1);
  for(let i = 0; i < numberOrders; i++)
    {
        productsRandom[i] = faker.commerce.product();
    }
  res.json({
    orders:numberOrders,
    products: productsRandom,
  })
});

router.post("/", (req, res) =>
  {
    const body = req.body;
    res.status(201).json(
      {
        message: "Se guardo correctamente la orden",
        data: body
      });
  });

router.patch("/:id", (req, res) =>
  {
    const body = req.body;
    const {id} = req.params;
    res.status(201).json(
      {
        message: "Se guardo correctamente master",
        data: body,
        id
      });
  });

router.delete("/:id", (req, res) =>
  {
    const {id} = req.params;
    res.json(
      {
        message: "Se elimino muy bien master",
        id
      });
  });
  
module.exports = router;
