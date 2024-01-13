const {faker} = require("@faker-js/faker");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const { models } = require("./../libs/sequelize");

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
    async find()
      {
        const response = await models.User.findAll({include: ["customer"]});
        return response;
      }
    async findByEmail(email)
      {
        const response = await models.User.findOne({
          where: {email}
        });
        return response;
      }
    async findOne(id)
      {
        // const element = this.users.find(item => item.id == id);


        // else if(element.isBlock)
        //   {
        //     throw boom.conflict("This user is block");
        //   }
        // else
        //   {
        //     return element
        //   } CODIGO DEPRECADO
        const user = await models.User.findByPk(id); //Busca el elemento con la llave primaria
        if(user != null)
          {
            return user;
          }
        else
          {
            throw boom.notFound("User not found master");
          }
      }
    async update(id, changes)
      {
        // const index = this.users.findIndex(item => item.id == id);
        // const userOld =this.users[index];
        // if(typeof changes.isBlock != "boolean")
        //     {
        //       throw boom.badRequest("The requiered data type must be boolean");
        //     }
        // else if( index === -1 )
        //     {
        //       throw boom.notFound("User not found chef");
        //     }

        // this.users[index] =
        //   {
        //     ...userOld,
        //     ...changes
        //   }

        //   return this.users[index]; CODIGO DEPRECADO
        const user = await this.findOne(id);
        const response = user.update(changes);
        return response;
      }

    async delete(id)
      {
        // const index = this.users.findIndex(item => item.id == id);
        // return index === -1 ? boom.notFound("User not found chef :("): this.users.splice(index, 1), {id: "Se elimino correctamente"}; CODIGO DEPRECADO
        const user = await this.findOne(id);
        await user.destroy(); //Elimina al usuario de la bd
        return {id}; //retorna el id
      }
    async create(data)
      {
        const hash = await bcrypt.hash(data.password, 10);
        const newUser = await models.User.create({
          ...data,
          password: hash
        }); //metodo crea un nuevo usuario

        delete newUser.dataValues.password // Se borra así un campo del objeto porque estamos usando sequelize

        return newUser;
      }
  }
  module.exports = UserService;
