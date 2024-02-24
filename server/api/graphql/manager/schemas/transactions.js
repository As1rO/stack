const { gql } = require('graphql-tag')

const transactionSchema = gql`
  type Transaction {
    id: ID!
    uuid: String!
    userId: ID!
    amount: Float!
    status: String!
    transactionDate: String!
    transactionType: String!
    description: String
    currency: String!
    payment_method: String!
    external_transaction_id: String
    refund_id: Int
  }

  input TransactionInput {
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
    transactions: [Transaction]
    transaction(uuid: String!): Transaction
  }

  type Mutation {
    createTransaction(input: TransactionInput!): Transaction
    updateTransaction(uuid: String!, input: TransactionInput!): Transaction
    deleteTransaction(uuid: String!): Boolean
  }
`

module.exports = transactionSchema
