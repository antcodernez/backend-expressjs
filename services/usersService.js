const {faker} = require("@faker-js/faker");

class UserService
  {
    constructor()
      {
        this.users = [],
        this.generate()
      }
    generate()
      {
        const usersLimit = 30;
        for(let i = 0; i < usersLimit; i++)
          {
            this.users.push({
              id: faker.string.uuid(),
              name: faker.person.fullName(),
              phone: faker.number.int(),
              gender: faker.person.sexType()
            }
            )
          }
      }
    find()
      {
        return this.users;
      }
    findOne(id)
      {
        const element = this.users.find(item => item.id == id);
        return element != undefined ? element : "404 no encontrado";
      }
    update(id, changes)
      {
        const index = this.users.findIndex(item => item.id == id);
        const userOld =this.users[index];

        if( index === -1 )
            {
              throw new Error("Product not found");
            }

          this.users[index] =
            {
              ...userOld,
              ...changes
            }

          return this.users[index];
      }
    delete(id)
      {
        const index = this.users.findIndex(item => item.id == id);
        return index === -1 ?   new Error("Product not found") : this.users.splice(index, 1), {id: "Se elimino correctamente"};
      }
    create(data)
      {
        const newUser = {
          id: faker.string.uuid(),
          ...data
        }
        this.users.push(newUser);
        return newUser;
      }
  }

  module.exports = UserService;
