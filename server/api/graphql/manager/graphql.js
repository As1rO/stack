const UserSchema = require('./schemas/user')
const UserQueries = require('./resolvers/UserQueries')
const UserMutations = require('./resolvers/UsersMutations')

const AccountSchema = require('./schemas/account')
const AccountQueries = require('./resolvers/AccountQueries')
const AccountMutations = require('./resolvers/AccountMutation')

const TransactionSchema = require('./schemas/transaction')
const TransactionMutations = require('./resolvers/TransactionMutations')
const TransactionQueries = require('./resolvers/TransactionQueries')

const CategorySchema = require('./schemas/category')
const CategoryQueries = require('./resolvers/CategoryQueries')
const CategoryMutations = require('./resolvers/CategoryMutations')

const typeDefs = [UserSchema, AccountSchema, TransactionSchema, CategorySchema]
const resolvers = {
  Query: {
    ...UserQueries,
    ...TransactionQueries,
    ...AccountQueries,
    ...CategoryQueries,
  },
  Mutation: {
    ...UserMutations,
    ...TransactionMutations,
    ...AccountMutations,
    ...CategoryMutations,
  },
}

module.exports = { typeDefs, resolvers }
