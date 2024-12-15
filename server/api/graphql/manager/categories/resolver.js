const CategoryModel = require('~/models/categories')
const categoryController = require('~/controllers/categoryController')

const queries = {
  categories: (_, {}, context) =>
    CategoryModel.findCategoriesByAccountId(context.user.account_id),
  category: (_, { uuid }) => CategoryModel.findCategoryByUuid(uuid),
}

const mutations = {
  createCategory: (_, { input }) => categoryController.createCategory(input),
  updateCategory: (_, { input, uuid }) =>
    categoryController.updateCategory(input, uuid),
  deleteCategory: (_, { uuid }) => categoryController.deleteCategory(uuid),
}

module.exports = {queries, mutations}
