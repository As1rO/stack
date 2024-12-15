const TransactionModel = require('~/models/transactions')
const transactionController = require('~/controllers/transactionController')


const queries = {
  transactions: async (_, { orderBy, filters }) => {
    return await TransactionModel.transactions(orderBy, filters)
  },
  transaction: async (_, { uuid }) => {
    return await TransactionModel.transaction(uuid)
  },
}

const mutations = {
  createTransaction: async (_, { input }) => {
    return await transactionController.createTransaction(input)
  },
  updateTransaction: async (_, { uuid, input }) => {
    return await transactionController.updateTransaction(uuid, input)
  },
  deleteTransaction: async (_, { uuid }) => {
    return await transactionController.deleteTransaction(uuid)
  },
}

module.exports = {queries, mutations}
