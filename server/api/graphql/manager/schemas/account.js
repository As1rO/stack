const { gql } = require('graphql-tag')

const AccountSchema = gql`
  type Account {
    id: ID!
    uuid: String!
    user_id: ID!
    name: String!
    description: String!
    currency: String!
  }

  input AccountInput {
    account_id: ID!
    name: String!
    description: String
    currency: String!
  }

  type Query {
    accounts: [Account] @auth
    account(uuid: String!): Account @auth
  }

  type Mutation {
    createAccount(input: AccountInput!): Account @auth
    updateAccount(uuid: String!, input: AccountInput!): Account @auth
    deleteAccount(uuid: String!): Boolean @auth
  }
`

module.exports = AccountSchema
