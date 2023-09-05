// Creamos la app
const express = require("express");
const routerApi = require("./routes");


const app = express(); // ejecutamos express como metodo dato que es un metodo constructor
const port = 9222; // donde quiero que corra mi app


// implementamos in midleware nativo de express, se usa cuando quiero empezar a recibir informacion en formato json
app.use(express.json());

// Usamos la app
app.get('/', (req, res) => {
    res.send(`<h1> Hola mi server en express papus </h1>`);
});

routerApi(app);

app.listen(port, () => {
  console.log(`Ya estoy funcionando master en el puerto ${port} http://localhost:9222`);
});

