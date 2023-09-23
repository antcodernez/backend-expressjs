const express = require("express");
const router = express.Router();

const UserService = require("../services/usersService.js");

const service = new UserService();

router.get("/", (req, res) => {
  const { limit } = req.query;
  if(limit != undefined)
    {
      const users = service.find();
      res.status(200).json(users.slice(0, limit));
    }
  else
    {
      const users = service.find();
      res.status(200).json(users);
    }
});

router.get("/:id", (req, res) => {
  const {id} = req.params;
  const user = service.findOne(id);
  res.status(200).json(user);
});

router.post("/", (req, res) =>
  {
      const body = req.body;
      const newUser = service.create(body);
      res.status(201).json(newUser);
  });

router.patch("/:id", (req, res) =>
  {
    try
      {
        const body = req.body;
        const {id} = req.params;
        const user =  service.update(id, body);
        res.json(user);
      }
    catch (error)
      {
        res.status(404).json({
          message: error.message
        })
      }
  });

router.delete("/:id", (req, res) =>
  {
    const {id} = req.params;
    const response = service.delete(id);
    res.status(200).json(response);
  });

module.exports = router;
