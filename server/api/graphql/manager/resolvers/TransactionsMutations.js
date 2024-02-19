// transactionResolvers.js
const transactionController = require('~/controllers/transactionController')

const TransactionMutations = {
  createTransaction: async (_, { token, input }) => {
    return await transactionController.createTransaction(token, input)
  },
  updateTransaction: async (_, { uuid, input }) => {
    return await transactionController.updateTransaction(uuid, input)
  },
  deleteTransaction: async (_, { uuid }) => {
    return await transactionController.deleteTransaction(uuid)
  },
}

module.exports = TransactionMutations
