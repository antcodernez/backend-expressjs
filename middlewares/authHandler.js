const boom = require("@hapi/boom");
const {config} = require("../config/config");

function checkApiKey(req, res, next)
  {
    const apiKey = req.headers["api"];
    if(apiKey === config.apiKey)
      {
        next();
      }
    else
      {
        next(boom.unauthorized("No estas autorizado canijo"))
      }
  }

function checkAdminRole(req, res, next)
  {

    const user = req.user;
    if (user.role === "admin" || user.role === "chef")
      {
        next();
      }
    else
      {
        next(boom.unauthorized("You are not a admin to post data :/"));
      }
  }

function checkRoles(...roles)
  {
    return (req, res, next) => {
      const user = req.user;
      console.log(user);
      if (roles.includes(user.role))
        {
          next();
        }
      else
        {
          next(boom.unauthorized("You not have the credentials to see this ñ.ñ"));
        }
    }
  }

module.exports = {checkApiKey, checkAdminRole, checkRoles}
