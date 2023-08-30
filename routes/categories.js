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


module.exports = router;

