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


module.exports = router;
