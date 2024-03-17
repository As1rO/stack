const Joi = require('joi')

const create = Joi.object({
  account_id: Joi.number().required(),
  amount: Joi.number().required(),
  status: Joi.string().required(),
  transaction_date: Joi.date().required(),
  transaction_type: Joi.string().required(),
  description: Joi.string().allow('', null).optional(),
  currency: Joi.string().required(),
  payment_method: Joi.string().required(),
  external_transaction_id: Joi.string().optional(),
  refund_id: Joi.number().optional(),
})

const update = Joi.object({
  account_id: Joi.number().required(),
  amount: Joi.number().optional(),
  status: Joi.string().optional(),
  transaction_date: Joi.date().optional(),
  transaction_type: Joi.string().optional(),
  description: Joi.string().allow('', null).optional(),
  currency: Joi.string().optional(),
  payment_method: Joi.string().optional(),
  external_transaction_id: Joi.string().optional(),
  refund_id: Joi.number().optional(),
})

const transactionValidationSchema = {
  create,
  update,
}

module.exports = transactionValidationSchema
