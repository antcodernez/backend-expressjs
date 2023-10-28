const express = require("express");
const router = express.Router();
const OrderService = require("../services/ordersService.js");
const validatorHandler = require("../middlewares/validatorHandler.js");
const { getOrdersSchema, updateOrdersSchema, createOrdersSchema } = require("../schemas/ordersSchema.js");


const service = new OrderService();

router.get("/", async (req, res, next) => {
  // const myOrders = await service.find();
  // res.json(myOrders);
  try
    {
      const myOrders = await service.find();
      res.json(myOrders);
    }
  catch (error)
    {
      next(error);
    }
});

router.get("/:id", validatorHandler(getOrdersSchema, "params"),
async (req, res, next) => {
  try
    {
      const {id} = req.params;
      const order = service.findOne(id);
      res.json(order);
    }
  catch(e)
    {
      next(e);
    }
});


router.post("/", validatorHandler(createOrdersSchema, "body"),
async (req, res) =>
  {
    const body = req.body;
    const order = await service.create(body);
    res.json(order);
  });

router.patch("/:id", validatorHandler(getOrdersSchema, "params"),
validatorHandler(updateOrdersSchema, "body"),
async (req, res, next) =>
  {
    try
      {
        const body = req.body;
        const {id} = req.params;
        const orderUpdate = await service.update(id, body);
        res.json(orderUpdate);
      }
    catch(error)
      {
        next(error);
      }
  });

router.delete("/:id", validatorHandler(getOrdersSchema, "params"),
async (req, res) =>
  {
    const {id} = req.params;
    const orderDeleted = await service.delete(id);
    res.json(orderDeleted);
  });

module.exports = router;
