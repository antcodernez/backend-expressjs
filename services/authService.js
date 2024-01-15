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
        delete user.dataValues.token;

        return user;
    }

  singToken(user)
    {
      const payload = {
        sub: user.id,
        role: user.role
      };

      const tokenSingIn = jwt.sign(payload, config.jwtSecret);

      return{
        user,
        tokenSingIn
      };

    }

  async sendMail(infoMail)
    {

      const transport = nodemailer.createTransport({
        host: config.emailHost,
        port: config.emailPort,
        auth: {
          user: config.emailTrapUser,
          pass: config.emailTrapPass
        }
      });

      await transport.sendMail(infoMail);

      return {
        message: "mail sent ñ.ñ"
      }
    }

  async sentRecovery(email)
    {
      const user = await service.findByEmail(email);
        if(!user)
          {
            throw boom.unauthorized("this email doesn't exists");
          }
      const payload = {sub: user.id};

      const token = jwt.sign(payload, config.jwtSecret, {expiresIn: "15min"}); //Expira en 15 minutos el token
      const link = `http://myfrontend.com/recovery?token=${token}`;
      await service.update(user.id, {
        token: token
      });
      const mail = {
        from: config.emailTrapUser, // sender address
        to: `${user.email}`, // list of receivers
        subject: "Email to recovery your password", // Subject line(asunto)
        html: `
        <b>Email sent from the api :D <br/> I'm the chef</b>
        <h1 style="color:red">Hi! ${user.email}</h1>

        <p>Sending email to recovery your password</p>
        <b>follow this link => ${link}</b>
        `
      }

      const rta = await this.sendMail(mail);

      return rta;
    }

  async changePassord(token, newPassword)
    {
      try
        {
          const payload = jwt.verify(token, config.jwtSecret);

          const user = await service.findOne(payload.sub);

          if(user.token !== token)
            {
              throw boom.unauthorized("You are unauthorized >:/");
            }

          const hash = await bcrypt.hash(newPassword, 10);
          await service.update(user.id, {
            token: null,
            password: hash
          })

          return {
            message: "The password was changed :D"
          }
        }
      catch (error)
        {
          throw boom.unauthorized("You are unauthorized >:/");
        }
    }
}

module.exports = {AuthService}
