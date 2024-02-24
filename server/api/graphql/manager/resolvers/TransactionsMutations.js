// transactionResolvers.js
const transactionController = require('~/controllers/transactionController')

const TransactionMutations = {
  createTransaction: async (_, { input }, context) => {
    // `context` est le 3e argument
    if (!context.user) {
      throw new Error('Unauthorized')
    }
    console.log('e', context.user)
    const transactionInput = { ...input, user_id: context.user.userId }
    return await transactionController.createTransaction(transactionInput)
  },
  updateTransaction: async (_, { uuid, input }) => {
    return await transactionController.updateTransaction(uuid, input)
  },
  deleteTransaction: async (_, { uuid }) => {
    return await transactionController.deleteTransaction(uuid)
  },
}

module.exports = TransactionMutations
