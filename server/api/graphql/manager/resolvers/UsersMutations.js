const { loginUser } = require('~/services/login')
const userController = require('~/controllers/userController')

const UsersMutations = {
  createUser: async (_, args) => {
    return await userController.createUser(args)
  },

  login: async (_, args) => {
    return loginUser(args.email, args.password)
  },
}

module.exports = UsersMutations
