const Joi = require('joi')

const isEmail = Joi.string().email()
const isPassword = Joi.string().min(6)
const isToken = Joi.string()
const isFirstname = Joi.string().min(2).max(30)
const isLastname = Joi.string().min(2).max(30)

module.exports = { isEmail, isPassword, isToken, isFirstname, isLastname }
