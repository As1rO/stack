const Joi = require('joi')

const userValidationSchema = Joi.object({
  firstname: Joi.string().min(2).max(30).required(),
  lastname: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  language: Joi.string().valid('en', 'fr', 'es').required(),
})

module.exports = userValidationSchema
