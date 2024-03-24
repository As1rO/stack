const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { currentUser } = require('../utils/context')

const CategoryModel = {
  findCategoriesByAccountId: async () => {
    const accountCategories = await prisma.AccountCategory.findMany({
      where: {
        account_id: currentUser().account_id,
      },
      include: {
        category: true,
      },
    })
    return accountCategories.map((ac) => ac.category)
  },
  findCategoryByUuid: async (uuid) => {
    return prisma.category.findUnique({
      where: { uuid },
    })
  },
  createCategory: async (input) => {
    return prisma.category.create({
      data: {
        ...input,
        AccountCategory: {
          create: {
            account: {
              connect: { id: currentUser().account_id },
            },
            is_default: false,
          },
        },
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
