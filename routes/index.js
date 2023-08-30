const productsRouter = require("./products");
const usersRouter = require("./users");
const categoriesRouter = require("./categories");
const myOrders = require("./myorders");
function routerApi(app)
  {
      app.use("/products", productsRouter);
      app.use("/users", usersRouter);
      app.use("/categories", categoriesRouter);
      app.use("/my-orders", myOrders);
  }

module.exports = routerApi;


// app.use() es un método que se utiliza para montar funciones de middleware en una instancia de la aplicación Express. Los middlewares son funciones que se ejecutan en secuencia cada vez que se recibe una solicitud HTTP, y tienen la capacidad de modificar la solicitud y la respuesta antes de que sean manejadas por la ruta final o el controlador.
