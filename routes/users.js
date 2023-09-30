const express = require("express");
const router = express.Router();

const UserService = require("../services/usersService.js");
const validatorHandler = require("../middlewares/validatorHandler.js");
const {createUserSchema, getUserSchema, updateUserSchema} = require("../schemas/usersSchema.js");
const service = new UserService();

router.get("/", async (req, res) => {
  const { limit } = req.query;
  if(limit != undefined)
    {
      const users = await service.find();
      res.status(200).json(users.slice(0, limit));
    }
  else
    {
      const users = await service.find();
      res.status(200).json(users);
    }
});

router.post("/", async (req, res) =>
  {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
  });

router.get("/:id", validatorHandler(),async (req, res) => {
  const {id} = req.params;
  const user = await service.findOne(id);
  res.status(200).json(user);
});

router.patch("/:id", async (req, res) =>
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
        res.status(404).json({
          message: error.message
        })
      }
  });

router.delete("/:id", async(req, res) =>
  {
    const {id} = req.params;
    const response = await service.delete(id);
    res.status(200).json(response);
  });

module.exports = router;
