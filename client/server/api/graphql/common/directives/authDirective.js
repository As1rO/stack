const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils')
const { defaultFieldResolver } = require('graphql')

function authDirective(directiveName) {
  return {
    authDirectiveTypeDefs: `directive @${directiveName} on OBJECT | FIELD_DEFINITION`,
    authDirectiveTransformer: (schema) =>
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
          const authDirective = getDirective(
            schema,
            fieldConfig,
            directiveName
          )?.[0]
          if (authDirective) {
            const { resolve = defaultFieldResolver } = fieldConfig
            fieldConfig.resolve = async function (source, args, context, info) {
              if (!context.user) {
                throw new Error('Non authentifié')
              }
              return resolve(source, args, context, info)
            }
          }
          return fieldConfig
        },
      }),
  }
}

module.exports = { authDirective }
