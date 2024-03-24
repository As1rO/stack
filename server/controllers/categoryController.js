const CategoryModel = require('~/models/categories')
const validate = require('../utils/validate')
const categoryValidationSchema = require('../validations/CategoryValidation')

const categoryController = {
  createCategory: async (input) => {
    validate(categoryValidationSchema.create, input)
    return await CategoryModel.createCategory(input)
  },

  updateCategory: async (input, uuid) => {
    validate(categoryValidationSchema.update, input)
    return await CategoryModel.updateCategory(input, uuid)
  },

  deleteCategory: async (uuid) => {
    return await CategoryModel.deleteCategory(uuid)
  },
}

module.exports = categoryController
