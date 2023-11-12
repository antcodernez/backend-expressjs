const { ValidationError } = require('sequelize');
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
    {
      res.status(409).json({
        statusCode: 409,
        message: err.name,
        errors: err.errors
      });
    }
  next(err);
};

module.exports = queryErrorHandler;
