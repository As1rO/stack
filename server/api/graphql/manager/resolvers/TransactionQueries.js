// transactionResolvers.js
const TransactionModel = require('~/models/transactions')

const TransactionQueries = {
  transactions: async (_, { orderBy, filters }) => {
    return await TransactionModel.transactions(orderBy, filters)
  },
  transaction: async (_, { uuid }) => {
    return await TransactionModel.transaction(uuid)
  },
}

module.exports = TransactionQueries
