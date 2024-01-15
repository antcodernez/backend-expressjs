const express = require("express");
const passport = require("passport");

const { AuthService } = require("../services/authService");
const {
  loginAuthSchema,
  recoveryAuthSchema,
  changePasswordAuthSchema,
} = require("../schemas/authSchema");

const validatorHandler = require("../middlewares/validatorHandler");

const router = express.Router();
const service = new AuthService();


//Los middlewares de validacion de schemas van antes del middleware de passport.authenticate
router.post("/login",
  validatorHandler(loginAuthSchema, "body"),
  passport.authenticate("local", {session: false}),
  async (req, res, next) =>
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
  validatorHandler(recoveryAuthSchema, 'body'),
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
router.post("/change-password",
  validatorHandler(changePasswordAuthSchema, 'body'),
  async (req, res, next) =>
    {
      try
        {
          const { newPassword, token } = req.body;

          const rta = await service.changePassord(token, newPassword);

          res.json(rta);
        }
      catch (error)
        {
          next(error);
        }

    });


module.exports = router;
