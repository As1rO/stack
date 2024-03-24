const Joi = require('joi')

const create = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('', null).optional(),
  icon: Joi.string().allow('', null).optional(),
  color: Joi.string().allow('', null).optional(),
})

const update = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().allow('', null).optional(),
  icon: Joi.string().allow('', null).optional(),
  color: Joi.string().allow('', null).optional(),
})

const categoryValidationSchema = {
  create,
  update,
}

module.exports = categoryValidationSchema
