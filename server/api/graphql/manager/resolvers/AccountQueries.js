// transactionResolvers.js
const AccountModel = require('~/models/accounts')
const TransactionModel = require('~/models/transactions')

const AccountQueries = {
  account: async (_, { uuid }, context) => {
    const account = await AccountModel.account(uuid)
    const transactions = await TransactionModel.transactionsByAccountId(
      account.id
    )
    return {
      ...account,
      transactions,
    }
  },
  accounts: async () => {
    const accounts = await AccountModel.accounts()
    const accountsWithTransactions = await Promise.all(
      accounts.map(async (account) => {
        const transactions = await TransactionModel.transactionsByAccountId(
          account.id
        )
        return {
          ...account,
          transactions,
        }
      })
    )
    return accountsWithTransactions
  },
}

module.exports = AccountQueries
