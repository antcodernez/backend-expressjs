const express = require("express");
const router = express.Router();

const UserService = require("../services/usersService.js");
const validatorHandler = require("../middlewares/validatorHandler.js");
const {createUserSchema, getUserSchema, updateUserSchema} = require("../schemas/usersSchema.js");
const service = new UserService();

router.get("/", async (req, res, next) => {
  try
    {
      const users = await service.find();
      res.json(users);
    }
  catch(e)
    {
      next(e);
    }
  // const { limit } = req.query;
  // if(limit != undefined)
  //   {
  //     const users = await service.find(limit);
  //     res.json(users);
  //   }
  // else
  //   {
  //     const users = await service.find();
  //     res.json(users);
  //   }
});

router.post("/", validatorHandler(createUserSchema, "body"),
  async (req, res, next) =>
    {
      try
        {
          const body = req.body;
          const newUser = await service.create(body);
          res.json(newUser);
        }
      catch (error)
        {
          next(error);
        }

    });

router.get("/:id", validatorHandler(getUserSchema, "params"), async (req, res, next) => {
  try
    {
      const {id} = req.params;
      const user = await service.findOne(id);
      res.json(user);
    }
  catch(error)
    {
      next(error);
    }

});

router.patch("/:id",validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) =>
    {
      try
        {
          const body = req.body;
          const {id} = req.params;
          const user =  await service.update(id, body);
          res.json(user);
        }
      catch (error)
        {
          next(error);
        }
    });

router.delete("/:id", validatorHandler(getUserSchema, "params"),
  async(req, res) =>
    {
      const {id} = req.params;
      const response = await service.delete(id);
      res.json(response);
    });

module.exports = router;
