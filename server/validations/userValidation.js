const Joi = require('joi')

const user = Joi.object({
  firstname: Joi.string().min(2).max(30).required(),
  lastname: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  language: Joi.string().valid('en', 'fr', 'es').required(),
})

const editUser = Joi.object({
  uuid: Joi.string().required(),
  firstname: Joi.string().min(2).max(30),
  lastname: Joi.string().min(2).max(30),
  email: Joi.string().email(),
  language: Joi.string().valid('en', 'fr', 'es'),
})

const userValidationSchema = {
  user,
  editUser,
}

module.exports = userValidationSchema
