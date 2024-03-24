const categoryController = require('~/controllers/categoryController')

const CategoryMutations = {
  createCategory: (_, { input }) => categoryController.createCategory(input),
  updateCategory: (_, { input, uuid }) =>
    categoryController.updateCategory(input, uuid),
  deleteCategory: (_, { uuid }) => categoryController.deleteCategory(uuid),
}

module.exports = CategoryMutations
