const {faker} = require("@faker-js/faker");
const boom = require("@hapi/boom");
const { models} = require("./../libs/sequelize");
// const getConnection = require("../libs/postgres"); codigo viejo, remplazado por el modelo en sequelize


class CategoriesService
{
  constructor()
    {
      this.categories = [];
      this.generate();
    }
  generate()
    {
      const limit = 35;
      for(let i = 0; i < limit; i++)
        {
          this.categories.push(
            {
              id: faker.string.uuid(),
              name: faker.commerce.department()
            });
        }
    }
  async find()
    {
      const response = await models.Category.findAll();
      return response;
      // return query == undefined ? this.categories : this.categories.slice(0, query);
      // const client = await getConnection();
      // const response = await client.query("select * from tb_tasks");
      // return response.rows;
    }
  async findOne(id)
    {
      // const element = this.categories.find( item => item.id == id);

      // if(element != undefined)
      //   {
      //     return element
      //   }
      // else
      //   {
      //     throw boom.notFound("categorie not found xd");
      //   }

      const categorie = await models.Category.findByPk(id, {
        include: ["products"]
      });
      if(!categorie)
        {
          throw boom.notFound("Categorie not found cheef");
        }
      return categorie;
    }
  async create(data)
    {
      // const newDepartment = {
      //   id: faker.string.uuid(),
      //   ...data
      // }
      // this.categories.push(newDepartment);
      // return newDepartment;
      const newCategorie = await models.Category.create(data);
      return newCategorie;
    }
  async update(id, changes)
    {
      // const index = this.categories.findIndex(item => item.id == id);
      // const categoryOld = this.categories[index];

      // if(index === -1)
      //   {
      //     throw boom.notFound("This department isn't avaliable");
      //   }
      //  this.categories[index] =
      //     {
      //       ...categoryOld,
      //       ...changes
      //     }
      //   return this.categories[index];
      const categorie = await this.findOne(id);
      const response = categorie.update(changes);
      return response;
    }
  async delete(id)
    {
      // const index = this.categories.findIndex(item => item.id == id);

      // return index === -1 ?  boom.notFound("This isn't avaliable") : this.categories.splice(index, 1), {"message": "se elimino correctamente el departamento con el id" + id};

      const categorie = await this.findOne(id);
      await categorie.destroy();
      return {id};
    }

}

module.exports = CategoriesService;
