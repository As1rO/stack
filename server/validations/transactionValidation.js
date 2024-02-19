const Joi = require('joi')

const create = Joi.object({
  amount: Joi.number().required(),
})

const update = Joi.object({
  amount: Joi.number(),
})

module.exports = {
  create,
  update,
}
