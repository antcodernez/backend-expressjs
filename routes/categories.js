const express = require("express");
const {faker} = require("@faker-js/faker");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    categories: faker.commerce.department(),
    categories2: faker.commerce.department(),
    categories3: faker.commerce.department(),
    categories4: faker.commerce.department(),
    categories5: faker.commerce.department()
  })
});

//endpoint con dos parametros
router.get("/categories/:categoryId/products/:productId", (req, res) => {
  const {categoryId, productId} = req.params;
  res.json({
      categoryId,
      productId
    });
});

router.post(`/:id`, (req, res) =>
  {
    const {id} = req.params;
    const body = req.body;
    res.status(201).json(
      {
        id,
        data: body,
        message: "Se guardo correctamente la categoria"
      }
    );
  });

router.patch("/:id", (req, res) =>
  {
    const body = req.body;
    const {id} = req.params;
    res.json(
      {
        message: "Se actualizo correctamente",
        id,
        data: body
      });
  });

router.delete("/:id", (req, res) =>
  {
    const {id} = req.params;
    res.json(
      {
          message: "Se elimino correctamente la categoria con el id: " + id
      });
  });
module.exports = router;

