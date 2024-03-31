// orderByDirective.js
const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils')
const { defaultFieldResolver, GraphQLError } = require('graphql')

function orderByDirective(directiveName) {
  return {
    orderByDirectiveTypeDefs: `directive @${directiveName}(column: String!, order: String = "ASC") on FIELD_DEFINITION`,
    orderByDirectiveTransformer: (schema) =>
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
          const orderByDirective = getDirective(
            schema,
            fieldConfig,
            directiveName
          )?.[0]
          if (orderByDirective) {
            const { resolve = defaultFieldResolver } = fieldConfig
            fieldConfig.resolve = async function (source, args, context, info) {
              const { column, order } = orderByDirective
              if (!['ASC', 'DESC'].includes(order.toUpperCase())) {
                throw new GraphQLError(`L'ordre '${order}' n'est pas valide.`)
              }
              context.orderBy = { column, order: order.toUpperCase() }
              return resolve(source, args, context, info)
            }
          }
          return fieldConfig
        },
      }),
  }
}

module.exports = { orderByDirective }
