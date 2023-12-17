const { loginUser } = require('../../../../services/login');
const UserModel = require('../../../../models/users');

const UsersMutations = {
  createUser: async (_, args) => {
    return await UserModel.createUser(args);
  },

  login: async (_, args) => {
    return loginUser(args.email, args.password);
  },
};

module.exports = UsersMutations;
