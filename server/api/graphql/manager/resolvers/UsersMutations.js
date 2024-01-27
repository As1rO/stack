const { loginUser } = require('~/services/login')
const userController = require('~/controllers/userController')
const { validateToken } = require('~/services/tokenValidation')

const UsersMutations = {
  createUser: async (_, args) => {
    return await userController.createUser(args)
  },

  login: async (_, args) => {
    return loginUser(args.email, args.password)
  },

  validateToken: async (_, args) => {
    return await validateToken(args.token)
  },
}

module.exports = UsersMutations
