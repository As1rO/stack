const TransactionModel = require('~/models/transactions')
const UserModel = require('~/models/users')
const validate = require('../utils/validate')
const transactionValidationSchema = require('../validations/transactionValidation')

const transactionController = {
  createTransaction: async (transactionData) => {
    // validate(transactionValidationSchema.create, transactionData

    return await TransactionModel.createTransaction(transactionData)
  },

  updateTransaction: async (uuid, transactionData) => {
    validate(transactionValidationSchema.update, transactionData)
    return await TransactionModel.updateTransaction(uuid, transactionData)
  },

  deleteTransaction: async (uuid) => {
    return await TransactionModel.deleteTransaction(uuid)
  },
}

module.exports = transactionController
