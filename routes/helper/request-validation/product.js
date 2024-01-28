const Joi = require("joi");
const error = require("./error-response");

const productIdValidation = (req, res, next) => {
  const productId = Joi.string().trim().required();

  const reqBodyValidation = productId.validate(req.params.productId);

  if (reqBodyValidation.error) {
    error(reqBodyValidation.error, res);
  } else {
    next();
  }
};

const createProductValidation = (req, res, next) => {
  const reqBodySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    ratings: Joi.number().optional(),
  });
  const reqBodyValidation = reqBodySchema.validate(req.body);
  if (reqBodyValidation.error) {
    error(reqBodyValidation.error, res);
  } else {
    next();
  }
};

const updateProductValidation = (req, res, next) => {
  const reqBodySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().optional(),
    category: Joi.string().optional(),
    ratings: Joi.number().optional(),
  });
  const reqBodyValidation = reqBodySchema.validate(req.body);
  if (reqBodyValidation.error) {
    error(reqBodyValidation.error, res);
  } else {
    next();
  }
};
module.exports = {
  productIdValidation,
  createProductValidation,
  updateProductValidation,
};
