const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { currentUser } = require('../utils/context')
const useOrderBy = require('~/utils/useOrderBy')
const useFilters = require('~/utils/useFilters')

const TransactionModel = {
  transactions: async (orderBy, filters) => {
    const orderClause = useOrderBy(orderBy)
    const whereClause = useFilters(filters)

    return await prisma.transaction.findMany({
      where: {
        ...whereClause,
        account_id: currentUser().account_id,
      },
      orderBy: orderClause,
    })
  },
  transaction: async (uuid) => {
    return await prisma.transaction.findUnique({
      where: { uuid: uuid },
    })
  },
  createTransaction: async (transactionData) => {
    return await prisma.transaction.create({
      data: {
        ...transactionData,
        account_id: currentUser().account_id,
      },
    })
  },

  updateTransaction: async (uuid, transactionData) => {
    return await prisma.transaction.update({
      where: { uuid },
      data: transactionData,
    })
  },

  deleteTransaction: async (uuid) => {
    return await prisma.transaction.delete({
      where: { uuid },
    })
  },
}

module.exports = TransactionModel
