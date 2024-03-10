const AccountModel = require('~/models/accounts')
const UserModel = require('~/models/users')
const validate = require('../utils/validate')
const accountValidationSchema = require('../validations/accountValidation')

const AccountController = {
  createAccount: async (accountData) => {
    validate(transactionValidationSchema.create, transactionData)
    return await AccountModel.createAccount(accountData)
  },

  updateAccount: async (uuid, accountData) => {
    validate(accountValidationSchema.update, accountData)
    return await AccountModel.updateAccount(uuid, accountData)
  },

  deleteAccount: async (uuid) => {
    return await AccountModel.deleteAccount(uuid)
  },
}

module.exports = AccountController
