const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const AccountModel = {
  accounts: async () => {
    return await prisma.account.findMany()
  },

  account: async (uuid) => {
    return await prisma.account.findUnique({
      where: { uuid: uuid },
    })
  },
  createAccount: async (accountData) => {
    return await prisma.transaction.create({
      data: {
        ...accountData,
        user_id: accountData.user_id,
      },
    })
  },

  updateAccount: async (uuid, accountData) => {
    return await prisma.account.update({
      where: { uuid },
      data: accountData,
    })
  },

  deleteAccoun: async (uuid) => {
    return await prisma.account.delete({
      where: { uuid },
    })
  },
}

module.exports = AccountModel
