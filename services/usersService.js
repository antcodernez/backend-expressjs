const {faker} = require("@faker-js/faker");
const boom = require("@hapi/boom");

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
              gender: faker.person.sexType(),
              isBlock: faker.datatype.boolean()
            });
          }
      }
    async find(query)
      {
        if(query == undefined)
          {
            return this.users;
          }
        else
          {
            return this.users.slice(0, query);
          }
      }
    async findOne(id)
      {
        const element = this.users.find(item => item.id == id);

        if(!element)
          {
            throw boom.notFound("User not found master");
          }
        else if(element.isBlock)
          {
            throw boom.conflict("This user is block");
          }
        else
          {
            return element
          }
      }
    async update(id, changes)
      {
        const index = this.users.findIndex(item => item.id == id);
        const userOld =this.users[index];
        if(typeof changes.isBlock != "boolean")
            {
              throw boom.badRequest("The requiered data type must be boolean");
            }
        else if( index === -1 )
            {
              throw boom.notFound("User not found chef");
            }

        this.users[index] =
          {
            ...userOld,
            ...changes
          }

          return this.users[index];
      }

    async delete(id)
      {
        const index = this.users.findIndex(item => item.id == id);
        return index === -1 ? boom.notFound("User not found chef :("): this.users.splice(index, 1), {id: "Se elimino correctamente"};
      }
    async create(data)
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
