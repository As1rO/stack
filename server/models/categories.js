const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const CategoryModel = {
  findCategoriesByAccountId: async (accountId) => {
    const accountCategories = await prisma.AccountCategory.findMany({
      where: {
        account_id: parseInt(accountId),
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
  createCategory: async (input, accountId) => {
    return prisma.category.create({
      data: {
        ...input,
        AccountCategory: {
          create: {
            account: {
              connect: { id: accountId },
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
