const express = require("express");
const router = express.Router();
const {faker} = require("@faker-js/faker");

//Ejemplo de consultas de parametros query
router.get("/", (req, res) => {
  const { limit, offset } = req.query; // asi voy a tener obtener los parametros que vengas desde query
  if(limit || offset)
    {
      res.json({
        limit,
        offset
      })
    }
  else
    {
      res.send(`<h1>No puso query parameters master :/ </h1>`);
    }
});

router.get("/:id", (req, res) => {
  const {id} = req.params;
  if(id > 100)
    {
      res.status(404).json({
        messge: `No encuentro al usuario con el ID: ${id}`
      });
    }
  else
    {
      res.json({
        id,
        messge: `Se solicito el usuario con el ID ${id}`,
        name: faker.person.fullName()
      });
    }
});

router.post("/", (req, res) =>
  {
    const body = req.body;
    res.status(201).json(
      {
        message: "Se guardo el usuario correctamente",
        data: body
      });
  });

router.patch("/:id", (req, res) =>
  {
    const body = req.body;
    const {id} = req.params;
    res.json(
      {
        message: "Se guardo correctamente master",
        id,
        data: body
      });
  });

router.delete("/:id", (req, res) =>
  {
    const {id} = req.params;
    res.json(
      {
        message: `Se elimino correctamente el usuario con el id: ${id}`,
      });
  });

module.exports = router;
