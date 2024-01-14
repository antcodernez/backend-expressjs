const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const UserService = require("./usersService");
const { config } = require("../config/config");

const service = new UserService();


class AuthService {
  async getUser(email, password)
    {
      const user = await service.findByEmail(email);
        if(!user)
          {
            throw boom.unauthorized();
          }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch)
          {
            throw boom.unauthorized("wrong password ñ.ñ");
          }
        delete user.dataValues.password;

        return user;
    }

  singToken(user)
    {
      const payload = {
        sub: user.id,
        role: user.role
      };

      const token = jwt.sign(payload, config.jwtSecret);

      return{
        user,
        token
      };

    }

  async sendMail(email)
    {

      const user = await service.findByEmail(email);
        if(!user)
          {
            throw boom.unauthorized("this email doesn't exists");
          }

      const transport = nodemailer.createTransport({
        host: config.emailHost,
        port: config.emailPort,
        auth: {
          user: config.emailTrapUser,
          pass: config.emailTrapPass
        }
      });

      await transport.sendMail({
        from: '"Calando esto" <marshday5@gmail.com>', // sender address
        to: `${user.email}`, // list of receivers
        subject: "Hola alv", // Subject line(asunto)
        text: "Soy un correo de la app de tiendas xd", // plain text body
        html: `
        <b>Correo enviado desde la api :D <br/> Soy el jefe</b>

        <h1>Hola ${user.email}</h1>
        <p>Enviando correo para cambio de contraseña</p>
        `
      });


      return {
        message: "mail sent ñ.ñ"
      }
    }
}

module.exports = {AuthService}
