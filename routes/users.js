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

  res.json({
    id,
    messge: `Se solicito el usuario con el ID ${id}`,
    name: faker.person.fullName()
  });
});

module.exports = router;
