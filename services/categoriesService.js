const {faker} = require("@faker-js/faker");


class CategoriesService
{
  constructor()
    {
      this.categories = [],
      this.generate()
    }
  generate()
    {
      const limit = 25;
      for(let i = 0; i < limit; i++)
        {
          this.categories.push(
            {
              id: faker.string.uuid(),
              name: faker.commerce.department()
            });
        }
    }
  find()
    {
      return this.categories;
    }
  findOne(id)
    {
      const element = this.categories.find( item => item.id == id);
      return element != undefined ? element : "404 no encontrado";
    }
  create(data)
    {
      const newDepartment = {
        id: faker.string.uuid(),
        ...data
      }
      this.categories.push(newDepartment);
      return newDepartment;
    }
  update(id, changes)
    {
      const index = this.categories.findIndex(item => item.id == id);
      const categoryOld = this.categories[index];

      if(index === -1)
        {
          throw new Error("product not found");
        }
       this.categories[index] =
          {
            ...categoryOld,
            ...changes
          }
        return this.categories[index];
    }
  delete(id)
    {
      const index = this.categories.findIndex(item => item.id == id);

      return index === -1 ?  new Error ("product not fund") : this.categories.splice(index, 1), {"message": "se elimino correctamente el departamento con el id" + id};

    }

}


module.exports = CategoriesService;
