const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { schemas, resolvers } = require('./api/graphql/manager/graphql');

const app = express();

const server = new ApolloServer({ typeDefs: schemas, resolvers });

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
