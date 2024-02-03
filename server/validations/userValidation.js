const Joi = require('joi')
const v = require('./rules.js')

const user = Joi.object({
  firstname: v.isFirstname.required(),
  lastname: v.isLastname.required(),
  email: v.isEmail.required(),
  password: v.isPassword.required(),
  language: Joi.string().valid('en', 'fr', 'es').required(),
})

const resetPassword = Joi.object({
  token: v.isToken.required(),
  newPassword: v.isPassword.required(),
})

const editUser = Joi.object({
  uuid: Joi.string().required(),
  firstname: v.isFirstname,
  lastname: v.isLastname,
  email: v.isEmail,
  language: Joi.string().valid('en', 'fr', 'es'),
})

const userValidationSchema = {
  user,
  resetPassword,
  editUser,
}

module.exports = userValidationSchema
