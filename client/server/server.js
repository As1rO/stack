require('module-alias/register')

const { ApolloServer } = require('@apollo/server')
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer')
const express = require('express')
const { expressMiddleware } = require('@apollo/server/express4')
const http = require('http')
const cors = require('cors')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { typeDefs, resolvers } = require('./api/graphql/manager/graphql')
const { checkAuth } = require('./middlewares/authMiddleware')
const {
  authDirective,
} = require('./api/graphql/common/directives/authDirective')
const errorMiddleware = require('./middlewares/errorsMiddleware')

const { authDirectiveTypeDefs, authDirectiveTransformer } =
  authDirective('auth')

async function startApolloServer() {
  const app = express()
  const httpServer = http.createServer(app)

  let schema = makeExecutableSchema({
    typeDefs: [authDirectiveTypeDefs, typeDefs],
    resolvers,
  })

  schema = authDirectiveTransformer(schema)

  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const user = checkAuth(req)
        return { user }
      },
    })
  )

  app.use(errorMiddleware)

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
}

startApolloServer()
