const AccountModel = require('~/models/accounts')
const accountController = require('~/controllers/accountController')

const queries = {
  accounts: async () => {
    return await AccountModel.accounts()
  },
  account: async (_, { uuid }) => {
    return await AccountModel.account(uuid)
  },
}

const mutations = {
  createAccount: async (_, { input }, context) => {
    if (!context.user) {
      throw new Error('Unauthorized')
    }
    const accountInput = { ...input, user_id: context.user.user_id }
    return await accountController.createAccount(accountInput)
  },
  updateAccount: async (_, { uuid, input }) => {
    return await accountController.updateAccount(uuid, input)
  },
  deleteAccount: async (_, { uuid }) => {
    return await accountController.deleteAccount(uuid)
  },
}

module.exports = {queries, mutations}
