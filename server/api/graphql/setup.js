const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { typeDefs, resolvers } = require('./manager/graphql');
const { authDirective } = require('./common/directives/authDirective');
const { expressMiddleware } = require('@apollo/server/express4');
const { checkAuth } = require('~/middlewares/authMiddleware')

const { authDirectiveTypeDefs, authDirectiveTransformer } = authDirective('auth');

const setupGraphQLServer = async (app, httpServer) => {
  let schema = makeExecutableSchema({
    typeDefs: [authDirectiveTypeDefs, ...typeDefs],
    resolvers,
  });

  schema = authDirectiveTransformer(schema);

  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const user = checkAuth(req);
        return { user };
      },
    })
  );
};

module.exports = { setupGraphQLServer };
