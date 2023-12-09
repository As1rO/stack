const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const app = express();

const server = new ApolloServer({ 
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
