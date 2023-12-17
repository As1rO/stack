const { gql } = require('graphql-tag');

const userSchema = gql`

  type User {
    id: Int!
    email: String!
    firstname: String!
    lastname: String!
    password: String!
    language: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type Query {
    users: [User!]! @auth
    user(id: Int!): User! @auth
  }

  type Mutation {
    createUser(email: String!, firstname: String!, lastname: String!, password: String!, language: String!): User!
    login(email: String!, password: String!): AuthPayload!
  }
`;

module.exports = userSchema;
