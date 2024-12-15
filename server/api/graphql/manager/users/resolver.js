const UserModel = require('~/models/users')
const { verifyToken } = require('~/services/tokenValidation')
const { loginUser } = require('~/services/login')
const userController = require('~/controllers/userController')
const { validateToken } = require('~/services/tokenValidation')


const queries = {
  users: async (parent, args, context) => {
    return await UserModel.users()
  },
  user: async (parent, args, context) => {
    return await UserModel.user(args.uuid)
  },
  verifyToken: async (_, { token }) => {
    try {
      await verifyToken(token)
      return { isValid: true }
    } catch (error) {
      throw error
    }
  },
}

const mutations = {
  createUser: async (_, args) => {
    return await userController.createUser(args)
  },

  login: async (_, args) => {
    return loginUser(args.email, args.password)
  },

  validateToken: async (_, args) => {
    return await validateToken(args.token)
  },

  requestPasswordReset: async (_, { email }) => {
    return await userController.requestPasswordReset(email)
  },

  resetPassword: async (_, { token, newPassword }) => {
    return await userController.resetPassword(token, newPassword)
  },

  editUser: async (_, args) => {
    return await userController.editUser(args)
  },
}

module.exports = {queries, mutations}
