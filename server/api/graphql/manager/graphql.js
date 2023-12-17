// server/api/graphql/manager/users/graphql.js
const userSchema = require('./users/schemas/users');
const userCreate = require('./users/resolvers/createUser');
const userLogin = require('./users/resolvers/loginUser');
const getUsers = require('./users/resolvers/getUsers');
const getUser = require('./users/resolvers/getUser');

const typeDefs = [userSchema];
const resolvers = {
  Query: {
    ...getUsers.Query,
    ...getUser.Query,
  },
  Mutation: {
    ...userCreate.Mutation, 
    ...userLogin.Mutation,
  },
};

module.exports = { typeDefs, resolvers };
