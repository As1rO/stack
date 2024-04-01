const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { currentUser } = require('../utils/context')
const useOrderBy = require('~/utils/useOrderBy')

const TransactionModel = {
  transactions: async (orderBy) => {
    const orderClause = useOrderBy(orderBy)

    return await prisma.transaction.findMany({
      where: {
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
