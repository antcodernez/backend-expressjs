const express = require("express");
const router = express.Router();
const OrderService = require("../services/ordersService.js")


const service = new OrderService();

router.get("/", (req, res) => {
  const myOrders = service.find();
  res.json(myOrders);
});

router.get("/:id", (req, res) => {
  const {id} = req.params;
  const order = service.findOne(id);

  res.json(order);
});


router.post("/", (req, res) =>
  {
    const body = req.body;
    const order = service.create(body);
    res.status(201).json(order);
  });

router.patch("/:id", (req, res) =>
  {
    try
      {
        const body = req.body;
        const {id} = req.params;
        const orderUpdate = service.update(id, body);
        res.status(201).json(orderUpdate);
      }
    catch(error)
      {
        res.json({
          message: error.message
        })
      }

  });

router.delete("/:id", (req, res) =>
  {
    const {id} = req.params;
    const orderDeleted = service.delete(id);
    res.json(orderDeleted);
  });

module.exports = router;
