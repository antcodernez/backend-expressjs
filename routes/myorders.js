const express = require("express");
const passport = require("passport");

const OrderService = require("../services/ordersService.js");
const validatorHandler = require("../middlewares/validatorHandler.js");
const { getOrdersSchema, addItemSchema} = require("../schemas/ordersSchema.js");

const router = express.Router();
const service = new OrderService();

router.get("/",
  passport.authenticate("jwt", {session: false})
  ,async (req, res, next) => {
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

router.get("/:id", validatorHandler(getOrdersSchema, "params"), async (req, res, next) => {
  try
    {
      const {id} = req.params;
      const order = await service.findOne(id);
      res.json(order);
    }
  catch(e)
    {
      next(e);
    }
});


router.post("/",
  passport.authenticate("jwt", {session: false}),
  async (req, res, next) =>
    {
        try
          {
            console.log(req.user);
            const body = {userId: req.user.sub};
            const order = await service.create(body);
            res.json(order);
          }
        catch (error)
          {
            next(error);
          }

    }
);

router.post("/add-item",
  passport.authenticate("jwt", {session: false}),
  validatorHandler(addItemSchema, "body"),
  async (req, res, next) =>
    {
        try {
          const body = req.body;
          const newItem = await service.addItem(body);
          res.json(newItem);
        } catch (error) {
          next(error)
        }

    });

router.patch("/:id", validatorHandler(getOrdersSchema, "params"),
// validatorHandler(updateOrdersSchema, "body"),
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
