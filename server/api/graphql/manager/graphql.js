const accountSchema = require('./accounts/schema')
const accountResolver = require('./accounts/resolver')

const categoryschema = require('./categories/schema')
const categoryResolver = require('./categories/resolver')

const transactionSchema = require('./transactions/schema')
const transactionResolver = require('./transactions/resolver')

const userSchema = require('./users/schema')
const userResolver = require('./users/resolver')

const typeDefs = [accountSchema, categoryschema, transactionSchema, userSchema]
const resolvers = {
  Query: {
    ...accountResolver.queries,
    ...categoryResolver.queries,
    ...transactionResolver.queries,
    ...userResolver.queries,
  },
  Mutation: {
    ...accountResolver.mutation,
    ...categoryResolver.mutations,
    ...transactionResolver.mutations,
    ...userResolver.mutations,
  },
}

module.exports = { typeDefs, resolvers }
