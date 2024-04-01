const { gql } = require('graphql-tag')

const TransactionSchema = gql`
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

  enum SortableColumns {
    transaction_date
    amount
    status
  }

  enum SortDirection {
    ASC
    DESC
  }

  input OrderByInput {
    column: SortableColumns!
    direction: SortDirection!
  }

  input TransactionFilter {
    status: String
    transaction_type: String
    currency: String
    payment_method: String
  }

  type Query {
    transactions(
      orderBy: OrderByInput
      filters: TransactionFilter
    ): [Transaction] @auth
    transaction(uuid: String!): Transaction @auth
  }

  type Mutation {
    createTransaction(input: TransactionInput!): Transaction @auth
    updateTransaction(uuid: String!, input: TransactionInput!): Transaction
      @auth
    deleteTransaction(uuid: String!): Boolean @auth
  }
`

module.exports = TransactionSchema
