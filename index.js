// Creamos la app
const express = require("express");
const routerApi = require("./routes/indexRouting");
const cors = require("cors");

const {logErrors, errorHandler, boomErrorHandler } = require("./middlewares/errorHandler");



const app = express(); // ejecutamos express como metodo dato que es un metodo constructor
const port = 9222; // donde quiero que corra mi app


// implementamos in midleware nativo de express, se usa cuando quiero empezar a recibir informacion en formato json
app.use(express.json());


const  whiteList = ["http://127.0.0.1:5501", "http://myapp.com", " http://localhost:9222"]; //aqui van los origenes donde si quiero tener peticiones
//Estos dos dominios van a tener permiso de hacer un request

const options = {
  origin: (origin, callback) => {
      if(whiteList.includes(origin))
        {
           callback(null, true)
           // null ----> se uso para decir que no hay error
           // true ----> el acceso esta permitido
        }
      else
        {
          callback(new Error("No permitido"));
        }
    }
  }


// Usamos la app
app.get('/', (req, res) => {
    res.send(`<h1> Hola mi server en express papus </h1>`);
});

routerApi(app);
//Se implementaron las opciones del cors para solo aceptar ciertas apps controladas
//Se van a enviar las configuraciones al cors
app.use(cors(options)); //Implementando cors para remover la proteccion por defecto que es que solo se aceptan peticiones desde su mismo origen

//Implementado los middlewares de tipo error; este tipo de middleware se hacen despues del routing
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Ya estoy funcionando master en el puerto ${port} http://localhost:9222`);
});
