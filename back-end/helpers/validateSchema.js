const Joi = require("joi");

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  branchCode: Joi.string().required(),
  roleName: Joi.string().required(),
});

module.exports = { authSchema };
