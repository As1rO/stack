// transactionResolvers.js
const TransactionModel = require('~/models/transactions')

const TransactionQueries = {
  transactions: async (_, { orderBy }) => {
    return await TransactionModel.transactions(orderBy)
  },
  transaction: async (_, { uuid }) => {
    return await TransactionModel.transaction(uuid)
  },
}

module.exports = TransactionQueries
