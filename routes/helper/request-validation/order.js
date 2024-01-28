const Joi = require("joi");
const error = require("./error-response");

const userIdValidation = (req, res, next) => {
  const userId = Joi.string().trim().required();

  const reqBodyValidation = userId.validate(req.params.userId);

  if (reqBodyValidation.error) {
    error(reqBodyValidation.error, res);
  } else {
    next();
  }
};

const orderIdValidation = (req, res, next) => {
  const orderId = Joi.string().trim().required();

  const reqBodyValidation = orderId.validate(req.params.orderId);

  if (reqBodyValidation.error) {
    error(reqBodyValidation.error, res);
  } else {
    next();
  }
};

const createOrderValidation = (req, res, next) => {
  const reqBodySchema = Joi.object({
    userId: Joi.string().required(),
    products: Joi.array().items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    ).required(),
    status: Joi.string().valid('pending', 'shipped', 'delivered').required(),
  });
  const reqBodyValidation = reqBodySchema.validate(req.body);
  if (reqBodyValidation.error) {
    error(reqBodyValidation.error, res);
  } else {
    next();
  }
};

const updateOrderValidation = (req, res, next) => {
  const reqBodySchema = Joi.object({
    status: Joi.string().valid('pending', 'shipped', 'delivered').required(),
  });
  const reqBodyValidation = reqBodySchema.validate(req.body);
  if (reqBodyValidation.error) {
    error(reqBodyValidation.error, res);
  } else {
    next();
  }
};

module.exports = {
  userIdValidation,
  orderIdValidation,
  createOrderValidation,
  updateOrderValidation,
};
