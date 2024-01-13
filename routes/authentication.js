const express = require("express");
const passport = require("passport");

const router = express.Router();


router.post("/login",
  passport.authenticate("local", {session: false})
  ,async (req, res, next) =>
    {
      try
        {
          res.json(req.user); // El middleware deja en el req.user el usuario que la autenticacion dejo
        }
      catch (error)
        {
          next(error);
        }

    });


module.exports = router;
