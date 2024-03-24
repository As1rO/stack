const CategoryModel = require('~/models/categories')

const categoryController = {
  createCategory: (input) => CategoryModel.createCategory(input),
  updateCategory: (input, uuid) => CategoryModel.updateCategory(input, uuid),
  deleteCategory: (uuid) => CategoryModel.deleteCategory(uuid),
}

module.exports = categoryController
