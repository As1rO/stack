const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const CategoryModel = {
  findCategoriesByAccountId: async (accountId) => {
    return prisma.category.findMany({
      where: { account_id: parseInt(accountId) },
    })
  },
  findCategoryByUuid: async (uuid) => {
    return prisma.category.findUnique({
      where: { uuid },
    })
  },
  createCategory: async (input, accountId) => {
    return prisma.category.create({
      data: {
        ...input,
      },
    })
  },
  updateCategory: async (input, uuid) => {
    return prisma.category.update({
      where: { uuid },
      data: input,
    })
  },
  deleteCategory: async (uuid) => {
    return prisma.category.delete({
      where: { uuid },
    })
  },
}

module.exports = CategoryModel
