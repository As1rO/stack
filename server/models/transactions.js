const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { currentUser } = require('../utils/context')

const TransactionModel = {
  transactions: async () => {
    console.log('user', currentUser().account_id)
    return await prisma.transaction.findMany()
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
        account_id: transactionData.account_id,
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
