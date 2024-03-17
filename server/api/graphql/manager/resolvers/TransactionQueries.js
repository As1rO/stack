// transactionResolvers.js
const TransactionModel = require('~/models/transactions')

const TransactionsQueries = {
  transactions: async () => {
    return await TransactionModel.transactions()
  },
  transaction: async (_, { uuid }) => {
    return await TransactionModel.transaction(uuid)
  },
}

module.exports = TransactionsQueries
