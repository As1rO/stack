const userSchema = require('./schemas/users');
const UsersQueries = require('./resolvers/UsersQueries');
const UsersMutations = require('./resolvers/UsersMutations');

const typeDefs = [userSchema];
const resolvers = {
  Query: {
    ...UsersQueries,
  },
  Mutation: {
    ...UsersMutations, 
  },
};

module.exports = { typeDefs, resolvers };
