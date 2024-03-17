// transactionResolvers.js
const TransactionModel = require('~/models/transactions')

const TransactionQueries = {
  transactions: async () => {
    return await TransactionModel.transactions()
  },
  transaction: async (_, { uuid }) => {
    return await TransactionModel.transaction(uuid)
  },
}

module.exports = TransactionQueries
