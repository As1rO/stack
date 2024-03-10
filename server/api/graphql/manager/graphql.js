const userSchema = require('./schemas/users')
const UsersQueries = require('./resolvers/UsersQueries')
const UsersMutations = require('./resolvers/UsersMutations')

const accountSchema = require('./schemas/accounts')
const AccountsQueries = require('./resolvers/AccountsQueries')
const AccountsMutations = require('./resolvers/AccountsMutations')

const transactionSchema = require('./schemas/transactions')
const TransactionsMutations = require('./resolvers/TransactionsMutations')
const TransactionsQuerries = require('./resolvers/TransactionsQuerries')

const typeDefs = [userSchema, accountSchema, transactionSchema]
const resolvers = {
  Query: {
    ...UsersQueries,
    ...TransactionsQuerries,
    ...AccountsQueries,
  },
  Mutation: {
    ...UsersMutations,
    ...TransactionsMutations,
    ...AccountsMutations,
  },
}

module.exports = { typeDefs, resolvers }
