const CategoryModel = require('~/models/categories')

const categoryController = {
  createCategory: (input, user) =>
    CategoryModel.createCategory(input, user.account_id),
  updateCategory: (input, uuid) => CategoryModel.updateCategory(input, uuid),
  deleteCategory: (uuid) => CategoryModel.deleteCategory(uuid),
}

module.exports = categoryController
