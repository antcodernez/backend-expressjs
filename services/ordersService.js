const {faker} = require("@faker-js/faker");
const boom = require("@hapi/boom");
const pool = require("../libs/postgres.pool" );


class ordersService
{
  constructor()
    {
      this.ordersList = [];
      this.generate();
      this.pool = pool; //Le asigno el pool
      this.pool.on("error", (err) => console.log(err)); //
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
      const query = "select * from tb_tasks";
      const response = await this.pool.query(query);
      return response.rows;
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

  async delete(id)
    {
      const index = this.ordersList.findIndex(item => item.id == id);

      return index === -1 ?
        boom.notFound("order not fund ñ.ñ") :
        this.ordersList.splice(index, 1), {"message": "se elimino correctamente su orden con el id" + id};
    }
}

module.exports = ordersService;
