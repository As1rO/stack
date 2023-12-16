const { loginUser } = require('../../../../../services/login');

const resolvers = {
  Mutation: {
    login: async (_, { email, password }) => {
      return loginUser(email, password);
    },
  },
};

module.exports = resolvers;