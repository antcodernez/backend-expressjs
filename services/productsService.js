//Vamos a definir la lógica de las interacciones a nivel transaccional que van a tener mi datos
//Manejo transaccional hacia un producto
const {faker} = require("@faker-js/faker");

class ProductService
  {
    constructor()
      {
        this.products = [];
        this.generate();
      }
      generate()
        {
          const limit = 100;
          for(let i = 0; i < limit; i++)
            {
              this.products.push(
                {
                  id: faker.string.uuid(),
                  name: faker.commerce.productName(),
                  price: parseInt(faker.commerce.price()),
                  image: faker.image.url(),
                });
            }
        }
      create(data)
        {
            const newProduct = {
              id: faker.string.uuid(),
              ...data
            }
            this.products.push(newProduct);
            return newProduct;
        }
      find()
        {
          return this.products;
        }
      findOne(id)
        {
          return this.products.find(item => item.id == id);
        }
      update(id)
        {
          const index = this.products.findIndex(item => item.id == id);
        }
      delete()
        {

        }
  }

module.exports = ProductService;



// if(id > 999) //Todos los parametros que se envian en el get, se envian como string, entonces debo asegurarme de definir que sea un string(aunque aqui funciona, debe ser por el debil tipado)
//       {
//         res.status(404).json({
//           message: `El ID ${id} que solicitaste no se encuentra rey`
//         });
//       }
//     else
//       {
//         res.status(200).json({
//           id,
//           name: faker.commerce.productName(),
//           price: faker.commerce.price(),
//           details: "You will be awesome with this"
//         });
//       }
