const UserModel = require('~/models/users')

const UsersQueries = {
  users: async (parent, args, context) => {
    return await UserModel.users()
  },
  user: async (parent, args, context) => {
    return await UserModel.user(args.uuid)
  },
}

module.exports = UsersQueries
