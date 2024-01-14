const {Strategy} = require("passport-local");

const {AuthService} = require("../../../services/authService");
const service = new AuthService();

const localStrategy = new Strategy(
  {
    //opciones
    usernameField: "email",
    passwordField: "password"
  },
  async (email, password, done) => {
    try
      {
        const user = await service.getUser(email, password);
        done(null, user);
      }
    catch(e)
      {
        done(e, false); // Si algo sale mal envio un false y continuo
      }
});

module.exports = {localStrategy};
