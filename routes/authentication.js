const express = require("express");
const passport = require("passport");

const { AuthService } = require("../services/authService");

const router = express.Router();
const service = new AuthService();

router.post("/login",
  passport.authenticate("local", {session: false})
  ,async (req, res, next) =>
    {
      try
        {
          const user  = req.user; // El middleware passport-authenticate deja en el req.user el usuario que la autenticacion dejo
          res.json(service.singToken(user));

        }
      catch (error)
        {
          next(error);
        }

    });

router.post("/recovery",
  async (req, res, next) =>
    {
      try
        {
          const { email } = req.body;
          const rta = await service.sentRecovery(email);
          res.json(rta);
        }
      catch (error)
        {
          next(error);
        }

    });


module.exports = router;
