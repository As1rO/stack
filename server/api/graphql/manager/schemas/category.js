const { gql } = require('graphql-tag')

const CategorySchema = gql`
  type Category {
    id: ID!
    uuid: String!
    name: String!
    description: String
    icon: String
    color: String
  }

  input CategoryInput {
    name: String!
    description: String
    icon: String
    color: String
  }

  type Query {
    categories: [Category]
    category(uuid: String!): Category
  }

  type Mutation {
    createCategory(input: CategoryInput!): Category
    updateCategory(uuid: String!, input: CategoryInput!): Category
    deleteCategory(uuid: String!): Boolean
  }
`

module.exports = CategorySchema
