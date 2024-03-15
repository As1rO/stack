// transactionResolvers.js
const AccountModel = require('~/models/accounts')

const TransactionsMutations = {
  accounts: async () => {
    return await AccountModel.accounts()
  },
  account: async (_, { uuid }) => {
    return await AccountModel.account(uuid)
  },
}

module.exports = TransactionsMutations
