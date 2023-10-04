const {faker} = require("@faker-js/faker");
const boom = require("@hapi/boom");

class ordersService
{
  constructor()
    {
      this.ordersList = [];
      this.generate();
    }
  generate()
    {
      const numberOrders = 15;

      for(let i = 0; i < numberOrders; i++)
        {
            this.ordersList.push({
              id: faker.string.uuid(),
              product: faker.commerce.product(),
              price: faker.commerce.price()
            });
        }
    }
  async find()
    {
      return this.ordersList;
    }
  findOne(id)
    {
      const element = this.ordersList.find( item => item.id == id);
      return element != undefined ? element : boom.notFound("Order not found chef");
    }
  create(data)
    {
      const newOrder = {
        id: faker.string.uuid(),
        ...data
      }
      this.ordersList.push(newOrder);
      return newOrder;
    }
  async update(id,changes)
    {
      const orderIndex = this.ordersList.findIndex(element => element.id == id);
      const orderUpdating = this.ordersList[orderIndex];

      if(orderIndex === -1)
        {
          throw boom.notFound("Order not found bitch ñ.ñr");
        }

      this.ordersList[orderIndex] = {
        ...orderUpdating,
        ...changes
      }

      return this.ordersList[orderIndex];
    }

  delete(id)
    {
      const index = this.ordersList.findIndex(item => item.id == id);

      return index === -1 ?
        new Error ("product not fund") :
        this.ordersList.splice(index, 1), {"message": "se elimino correctamente su orden con el id" + id};
    }
}

module.exports = ordersService;
