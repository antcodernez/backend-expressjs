const express = require("express");
const passport = require("passport");
const ordersService = require("../services/ordersService");

const service = new ordersService();
const router = express.Router();


router.get("/my-orders",
  passport.authenticate("jwt", {session: false})
  ,async (req, res, next) =>
    {
      try
        {
          const user = req.user;
          const orders = await service.findByUser(user.sub);
          res.json(orders)
        }
      catch (error)
        {
          next(error);
        }

    });


module.exports = router;
