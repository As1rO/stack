const userSchema = require('./schemas/users')
const UsersQueries = require('./resolvers/UsersQueries')
const UsersMutations = require('./resolvers/UsersMutations')

const transactionSchema = require('./schemas/transactions')
const TransactionsMutations = require('./resolvers/TransactionsMutations')
const TransactionsQuerries = require('./resolvers/TransactionsQuerries')

const typeDefs = [userSchema, transactionSchema]
const resolvers = {
  Query: {
    ...UsersQueries,
    ...TransactionsQuerries,
  },
  Mutation: {
    ...UsersMutations,
    ...TransactionsMutations,
  },
}

module.exports = { typeDefs, resolvers }
