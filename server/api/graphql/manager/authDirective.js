const { defaultFieldResolver, GraphQLDirective, DirectiveLocation, GraphQLSchema } = require('graphql');
const { SchemaDirectiveVisitor } = require('apollo-server-express');
const { checkAuth } = require('../../middlewares/authMiddleware');

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const context = args[2];
      const user = checkAuth(context);
      if (!user) {
        throw new Error('Non authentifié');
      }
      return resolve.apply(this, args);
    };
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    auth: AuthDirective,
  },
});