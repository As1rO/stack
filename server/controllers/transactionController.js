const TransactionModel = require('~/models/transactions')
const UserModel = require('~/models/users')
const validate = require('../utils/validate')
const transactionValidationSchema = require('../validations/transactionValidation')

const transactionController = {
  createTransaction: async (token, transactionData) => {
    // validate(transactionValidationSchema.create, transactionData)

    const user = await UserModel.findUserByToken(token)
    if (!user) {
      throw new Error('Utilisateur non trouvé ou token invalide.')
    }

    const completeTransactionData = {
      ...transactionData,
      userId: user.id,
    }

    return await TransactionModel.createTransaction(completeTransactionData)
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
