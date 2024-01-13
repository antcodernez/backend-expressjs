const {Strategy} = require("passport-local");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const UserService = require("../../../services/usersService");
const { use } = require("passport");

const service = new UserService();

const localStrategy = new Strategy(
  {
    //opciones
    usernameField: "email",
    passwordField: "password"
  },
  async (email, password, done) => {
    try
      {
        const user = await service.findByEmail(email);
        if(!user)
          {
            done(boom.unauthorized(), false)
          }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch)
          {
            done(boom.unauthorized("wrong password ñ.ñ"), false)
          }
        delete user.dataValues.password;
        
        done(null, user);

      }
    catch(e)
      {
        done(e, false); // Si algo sale mal envio un false y continuo
      }
});

module.exports = {localStrategy};
