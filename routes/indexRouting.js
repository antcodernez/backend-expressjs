const productsRouter = require("./products");
const usersRouter = require("./users");
const categoriesRouter = require("./categories");
const myOrders = require("./myorders");
const customers = require("./customers");
const express = require("express");

//Vamos a generar un routing por versiones a traves de una ruta maestra para que mis clientes de frontend no choquen con mis clientes de IOT
function routerApi(app)
  {
      const router  = express.Router();
      app.use("/api/v1", router); //generamos un path global para todos los endpoints
      router.use("/products", productsRouter);
      router.use("/users", usersRouter);
      router.use("/categories", categoriesRouter);
      router.use("/orders", myOrders);
      router.use("/customers", customers);

      //Version 2 para mobiles
      const routerIOT = express.Router()
      app.use("/api/v2", routerIOT);
      routerIOT.use("/products", productsRouter);
  }

module.exports = routerApi;


// app.use() es un método que se utiliza para montar funciones de middleware en una instancia de la aplicación Express. Los middlewares son funciones que se ejecutan en secuencia cada vez que se recibe una solicitud HTTP, y tienen la capacidad de modificar la solicitud y la respuesta antes de que sean manejadas por la ruta final o el controlador.
