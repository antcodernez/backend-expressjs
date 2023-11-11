const boom = require('@hapi/boom');
const { ValidationError } = require('sequelize');
const boomErrorHandler = require("./errorHandler");
// function handleSQLError(err, req, res, next)
//   {
//     if(err instanceof ValidationError)
//       {
//         throw boom.conflict(err.errors[0].message);
//       }
//     next(err)
//   }

// module.exports = handleSQLError;

const queryErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError)
    boomErrorHandler(boom.badRequest(err.message), req, res, next);
  next(err);
};

module.exports = queryErrorHandler;
