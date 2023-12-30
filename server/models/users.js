const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const UserModel = {
  users: async () => {
    return await prisma.user.findMany()
  },
  user: async (uuid) => {
    return await prisma.user.findUnique({
      where: { uuid: uuid },
    })
  },

  createUser: async (userData) => {
    return await prisma.user.create({
      data: userData,
    })
  },
}

module.exports = UserModel
