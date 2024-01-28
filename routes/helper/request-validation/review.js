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

const createReviewValidation = (req, res, next) => {
  const reqBodySchema = Joi.object({
    userId: Joi.string().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string(),
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
  createReviewValidation,
};
