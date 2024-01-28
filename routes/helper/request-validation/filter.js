const Joi = require("joi");
const error = require("./error-response");

const filterValidation = (req, res, next) => {
  const reqBodySchema = Joi.object({
    category: Joi.string(),
    minPrice: Joi.number().min(0),
    maxPrice: Joi.number().greater(Joi.ref('minPrice')).when('minPrice', {
      is: Joi.number().required(),
      then: Joi.number().required(),
      otherwise: Joi.number(),
    }),
    minRating: Joi.number().integer().min(1).max(5),
    maxRating: Joi.number().integer().min(Joi.ref('minRating')).max(5).when('minRating', {
      is: Joi.number().required(),
      then: Joi.number().required(),
      otherwise: Joi.number(),
    }),
  });
  const reqBodyValidation = reqBodySchema.validate(req.query);
  if (reqBodyValidation.error) {
    error(reqBodyValidation.error, res);
  } else {
    next();
  }
};
module.exports = {
  filterValidation,
};
