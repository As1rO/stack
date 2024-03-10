const { gql } = require('graphql-tag')

const transactionSchema = gql`
  type Transaction {
    id: ID!
    uuid: String!
    account_id: ID!
    amount: Float!
    status: String!
    transaction_date: String!
    transaction_type: String!
    description: String
    currency: String!
    payment_method: String!
    external_transaction_id: String
    refund_id: Int
  }

  input TransactionInput {
    account_id: ID!
    amount: Float!
    status: String!
    transaction_date: String!
    transaction_type: String!
    description: String
    currency: String!
    payment_method: String!
    external_transaction_id: String
    refund_id: Int
  }

  type Query {
    transactions: [Transaction] @auth
    transaction(uuid: String!): Transaction @auth
  }

  type Mutation {
    createTransaction(input: TransactionInput!): Transaction @auth
    updateTransaction(uuid: String!, input: TransactionInput!): Transaction
      @auth
    deleteTransaction(uuid: String!): Boolean @auth
  }
`

module.exports = transactionSchema
