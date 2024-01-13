const express = require("express");
const passport = require("passport");

const CategoriesService = require("../services/categoriesService");
const validatorHandler = require("../middlewares/validatorHandler");
const {createCategorieSchema, getCategorieSchema, updateCategoriesSchema} = require("../schemas/categoriesSchema.js");
const {checkRoles} = require("../middlewares/authHandler.js");

const router = express.Router();
const service = new CategoriesService();

router.get("/",
  passport.authenticate("jwt", {session: false}),
  checkRoles("admin", "chef", "seller"),
  async (req, res, next) => {
  // const {limit} = req.query;
  // if(limit != undefined)
  //
   try
      {
        const departments = await service.find();
        res.json(departments);
      }
    catch (error)
      {
        next(error);
      }
});


router.get("/:id",
  passport.authenticate("jwt", {session: false}),
  checkRoles("admin", "chef", "seller"),
  validatorHandler(getCategorieSchema, "params"),
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

router.post(`/`,

  passport.authenticate("jwt", {session: false}),
    // Al usuario que se le asigno ese token, desde el cliente debe enviar en el header ese token para que se mantenga en la sesion
  checkRoles("admin", "chef", "seller"),
  validatorHandler(createCategorieSchema, "body"),

  async(req, res, next) =>
    {
        try
          {
            const body = req.body;
            const newDepartment = await service.create(body);
            res.json(newDepartment);
          }
        catch (error)
          {
            next(error);
          }

    });

router.patch("/:id",
  passport.authenticate("jwt", {session: false}),

  checkRoles("admin", "customer"),

  validatorHandler(getCategorieSchema, "params"),

  validatorHandler(updateCategoriesSchema, "body"),

  async (req, res, next) =>
    {
      try
        {
          const body = req.body;
          const { id } = req.params;
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

