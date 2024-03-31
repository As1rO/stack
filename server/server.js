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
const namespace = require('./utils/clsNamespace')
const { checkAuth } = require('./middlewares/authMiddleware')
const {
  authDirective,
} = require('./api/graphql/common/directives/authDirective')
const {
  orderByDirective,
} = require('./api/graphql/common/directives/orderByDirective')
const errorMiddleware = require('./middlewares/errorsMiddleware')

const { authDirectiveTypeDefs, authDirectiveTransformer } =
  authDirective('auth')
const { orderByDirectiveTypeDefs, orderByDirectiveTransformer } =
  orderByDirective('orderBy')

async function startApolloServer() {
  const app = express()
  const httpServer = http.createServer(app)

  app.use((req, res, next) => {
    namespace.run(() => {
      next()
    })
  })

  let schema = makeExecutableSchema({
    typeDefs: [authDirectiveTypeDefs, orderByDirectiveTypeDefs, typeDefs],
    resolvers,
  })

  schema = authDirectiveTransformer(schema)
  schema = orderByDirectiveTransformer(schema)

  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  const corsOptions = {
    origin: 'http://localhost:3000/app/',
    optionsSuccessStatus: 200,
  }

  app.use(
    '/graphql',
    cors(corsOptions),
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
