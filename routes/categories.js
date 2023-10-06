const express = require("express");
const router = express.Router();
const CategoriesService = require("../services/categoriesService");
const service = new CategoriesService();
const validatorHandler = require("../middlewares/validatorHandler");
const {createCategorieSchema, getCategorieSchema, updateCategoriesSchema} = require("../schemas/categoriesSchema.js");

router.get("/", async (req, res) => {
  const {limit} = req.query;
  if(limit != undefined)
    {
      const departments = await service.find(limit);
      res.json(departments);
    }
  else
    {
      const departments = await service.find();
      res.json(departments);
    }
});


router.get("/:id", validatorHandler(getCategorieSchema, "params"),
async(req, res, next) => {
  try
    {
      const { id } = req.params;
      const department = await service.findOne(id);
      res.json(department);
    }
  catch(e)
    {
      next(e);
    }
});
// //endpoint con dos parametros
// router.get("/categories/:categoryId/products/:productId", (req, res) => {

//   const {categoryId, productId} = req.params;
//   res.json({
//       categoryId,
//       productId
//     });
// });

router.post(`/`, validatorHandler(createCategorieSchema, "body"),
async(req, res) =>
  {
    const body = req.body;
    const newDepartment = await service.create(body);
    res.json(newDepartment)
  });

router.patch("/:id", validatorHandler(getCategorieSchema, "params"),
validatorHandler(updateCategoriesSchema, "body"),
async (req, res, next) =>
  {
    try
      {
        const body = req.body;
        const {id} = req.params;
        const department = await service.update(id,body);
        res.json(department);
      }
    catch (e)
      {
       next(e)
      }
  });

router.delete("/:id", validatorHandler(getCategorieSchema, "params"),
async(req, res) =>
  {
    const {id} = req.params;
    const response = await service.delete(id);
    res.json(response);
  });

module.exports = router;

