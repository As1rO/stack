require('module-alias/register');
const express = require('express');
const http = require('http');
const applyMiddlewares = require('./middlewares');
const { setupGraphQLServer } = require('./api/graphql/setup');
const namespace = require('./utils/clsNamespace')

const app = express();
  app.use((req, res, next) => {
    namespace.run(() => {
 
      next()
    })
  })

applyMiddlewares(app);

const httpServer = http.createServer(app);

setupGraphQLServer(app, httpServer).then(() => {
  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
});