const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { schemas, resolvers } = require('./api/graphql/manager/graphql');
const { authMiddleware } = require('./middleware/authMiddleware');

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs: schemas, resolvers });

    app.use(authMiddleware);

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
