const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { schemas, resolvers } = require('./api/graphql/manager/graphql');
const { checkAuth } = require('./middlewares/authMiddleware');

async function startServer() {
  const app = express();
  const server = new ApolloServer({ 
    typeDefs: schemas, 
    resolvers,
    context: ({ req }) => {
      // Verify user authentication
      const user = checkAuth(req);
      return { user };
    }
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
