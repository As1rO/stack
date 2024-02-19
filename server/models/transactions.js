const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const TransactionModel = {
  transactions: async () => {
    return await prisma.transaction.findMany()
  },

  transaction: async (uuid) => {
    return await prisma.transaction.findUnique({
      where: { uuid: uuid },
    })
  },
  createTransaction: async (transactionData) => {
    return await prisma.transaction.create({
      data: transactionData,
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
