const { loginUser } = require('../../../../../services/login');

const resolvers = {
  Mutation: {
    login: async (_, args) => {
      return loginUser(args.email, args.password);
    },
  },
};

module.exports = resolvers;