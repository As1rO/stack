const Joi = require('joi')

const create = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('', null),
  user_id: Joi.number().integer().required(),
})

const update = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().allow('', null).optional(),
  currency: Joi.string().optional(),
  user_id: Joi.number().integer().optional(),
})

module.exports = {
  create,
  update,
}
