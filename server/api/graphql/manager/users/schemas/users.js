const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    firstname: String!
    lastname: String!
    password: String!
    language: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(email: String!, firstname: String!, lastname: String!, password: String!, language: String!): User!
  }
`;

module.exports = typeDefs;
