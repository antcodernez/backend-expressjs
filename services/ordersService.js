const {faker} = require("@faker-js/faker");
const boom = require("@hapi/boom");
// const pool = require("../libs/postgres.pool" ); se cambio por una en sequelize
// const sequelize = require("../libs/sequelize"); codigo deprecado
const { models} = require("../libs/sequelize");


class ordersService
{
  constructor()
    {
      this.ordersList = [];
      this.generate();

      // this.pool = pool; //Le asigno el pool
      // this.pool.on("error", (err) => console.log(err)); // no es necesario por sequelize
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
      // const query = "select * from tb_tasks";
      // const [data] = await sequelize.query(query);
      // return data; CODIGO DEPRECADO POR OTRA VERSION
      //sequelize acepta consultas directas y retorna la informacion en un array, la primera posicion tiene la data y en la segunda es la metadata       const [data, metadata] = await sequelize.query(query);
      const response = await models.Order.findAll();
      return response;
    }
  async findOne(id)
    {
      // const element = this.ordersList.find( item => item.id == id);
      // return element != undefined ? element : boom.notFound("Order not found chef");
      const order = await models.Order.findByPk(id, {
        include: [{
          association: "customer",
          include: ["user"]
          // traer datos de forma anidada, significa que me traigo al customer y del customer me traigo anidado el user del customer
        }]
      });

      if(order != null)
        {
          return order;
        }
        else
        {
          throw boom.notFound("Order not found");
        }
    }
  async create(data)
    {
      // const newOrder = {
      //   id: faker.string.uuid(),
      //   ...data
      // }
      // this.ordersList.push(newOrder);
      // return newOrder;

      const newOrder = await models.Order.create(data);
      return newOrder;
    }
  async update(id,changes)
    {
      // const orderIndex = this.ordersList.findIndex(element => element.id == id);
      // const orderUpdating = this.ordersList[orderIndex];

      // if(orderIndex === -1)
      //   {
      //     throw boom.notFound("Order not found bitch ñ.ñr");
      //   }

      // this.ordersList[orderIndex] = {
      //   ...orderUpdating,
      //   ...changes
      // }
      // return this.ordersList[orderIndex];
      const order = await this.findOne(id);
      const res = order.update(changes);
      return res;
    }

  async delete(id)
    {
      // const index = this.ordersList.findIndex(item => item.id == id);

      // return index === -1 ?
      //   boom.notFound("order not fund ñ.ñ") :
      //   this.ordersList.splice(index, 1), {"message": "se elimino correctamente su orden con el id" + id};
      const order = await this.findOne(id);
      await order.destroy();
      return {id};
    }
}

module.exports = ordersService;
