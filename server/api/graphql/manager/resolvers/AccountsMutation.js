// accountResolvers.js
const accountController = require('~/controllers/accountController')

const AccountMutations = {
  createAccount: async (_, { input }, context) => {
    // `context` est le 3e argument
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

module.exports = AccountMutations
