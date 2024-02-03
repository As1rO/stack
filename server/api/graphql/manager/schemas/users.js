const { gql } = require('graphql-tag')

const userSchema = gql`
  type User {
    id: Int!
    uuid: String!
    email: String!
    firstname: String!
    lastname: String!
    language: String!
    is_admin: Boolean!
    isVerified: Boolean
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type VerifyTokenPayload {
    isValid: Boolean!
  }

  type Query {
    users: [User!]! @auth
    user(uuid: String!): User! @auth
    verifyToken(token: String!): VerifyTokenPayload
  }

  type Mutation {
    createUser(
      email: String!
      firstname: String!
      lastname: String!
      password: String!
      language: String!
    ): User!
    login(email: String!, password: String!): AuthPayload!
    validateToken(token: String!): String!
    requestPasswordReset(email: String!): String!
    resetPassword(token: String!, newPassword: String!): String!
    editUser(
      uuid: String!
      email: String
      firstname: String
      lastname: String
      language: String
    ): User! @auth
  }
`

module.exports = userSchema
