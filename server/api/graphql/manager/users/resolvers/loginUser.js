const { loginUser } = require('../services/login'); // Assurez-vous que le chemin est correct

const resolvers = {
  Mutation: {
    login: async (_, { email, password }) => {
      return loginUser(email, password);
    },
  },
};

module.exports = resolvers;