const CategoryModel = require('~/models/categories')

const CategoryQueries = {
  categories: (_, {}, context) =>
    CategoryModel.findCategoriesByAccountId(context.user.account_id),
  category: (_, { uuid }) => CategoryModel.findCategoryByUuid(uuid),
}

module.exports = CategoryQueries
