// transactionResolvers.js
const TransactionModel = require('~/models/transactions')

const TransactionsMutations = {
  transactions: async () => {
    return await TransactionModel.transactions()
  },
  transaction: async (_, { uuid }) => {
    return await TransactionModel.transaction(uuid)
  },
}

module.exports = TransactionsMutations
