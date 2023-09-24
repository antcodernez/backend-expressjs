//Vamos a definir la lógica de las interacciones a nivel transaccional que van a tener mi datos
//Manejo transaccional hacia un producto
const {faker} = require("@faker-js/faker");
const boom =  require("@hapi/boom");

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
                  isBLock: faker.datatype.boolean()
                });
            }
        }
      async create(data)
        {
            const newProduct = {
              id: faker.string.uuid(),
              ...data
            }
            this.products.push(newProduct);
            return newProduct;
        }
      async find(query)
        {
          if (query == undefined)
            {
              return new Promise((resolve) =>
                {
                  setTimeout(() => resolve(this.products), 1000);
                });
            }
          else
            {
              return new Promise((resolve) =>
                {
                  setTimeout(() => resolve(this.products.slice(0,query)), 1000);
                });
            }
        }
      async findOne(id)
        {
          const element  = this.products.find(item => item.id == id);
          if(!element)
            {
              throw boom.notFound("Product not found master");
            }
          if(element.isBLock)
            {
              throw boom.conflict("Product is block")
            }
          else
            {
              return element;
            }
        }
      async update(id, changes)
        {
          const index = this.products.findIndex(item => item.id == id);
          const productOld =this.products[index];
          if( index === -1 )
            {
              throw boom.notFound("Product not found :(");
            }

          this.products[index] =
            {
              ...productOld,
              ...changes
            }

          return this.products[index];
        }
      async delete(id)
        {
          const index = this.products.findIndex(item => item.id == id);
          return index === -1 ? boom.notFound("Product not f0und :(") :
          this.products.splice(index, 1), {id: "Se elimino correctamente"};
        }
  }

module.exports = ProductService;
