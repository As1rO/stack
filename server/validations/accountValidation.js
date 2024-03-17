const Joi = require('joi')

const create = Joi.object({
  name: Joi.string().required(),
})

const update = Joi.object({
  name: Joi.string().optional(),
})

const accountValidationSchema = {
  create,
  update,
}

module.exports = accountValidationSchema
