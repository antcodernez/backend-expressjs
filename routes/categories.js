const express = require("express");
const router = express.Router();

const CategoriesService = require("../services/categoriesService");

const service = new CategoriesService();

router.get("/", (req, res) => {
  const departments = service.find();
  res.json(departments);
});


router.get("/:id", (req, res) => {
  const { id } = req.params;
  const department = service.findOne(id);
  res.json(department);
});
// //endpoint con dos parametros
// router.get("/categories/:categoryId/products/:productId", (req, res) => {

//   const {categoryId, productId} = req.params;
//   res.json({
//       categoryId,
//       productId
//     });
// });

router.post(`/`, (req, res) =>
  {
    const body = req.body;
    const newDepartment = service.create(body);
    res.status(201).json(newDepartment)
  });

router.patch("/:id", (req, res) =>
  {
    try
      {
        const body = req.body;
        const {id} = req.params;
        const department = service.update(id,body);
        res.json(department);
      }
    catch (error)
      {
        res.status(404).json(
          {
            message: error.message
          }
          )
      }

  });

router.delete("/:id", (req, res) =>
  {
    const {id} = req.params;
    const response = service.delete(id);
    res.status(200).json(response);
  });

module.exports = router;

