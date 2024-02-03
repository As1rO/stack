const UserModel = require('~/models/users')
const { verifyToken } = require('~/services/tokenValidation')

const UsersQueries = {
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

module.exports = UsersQueries
