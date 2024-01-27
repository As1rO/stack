const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const tokenModel = {
  createToken: async (tokenData) => {
    return await prisma.token.create({
      data: tokenData,
    })
  },

  findToken: async (token) => {
    return await prisma.token.findUnique({
      where: { token: token },
    })
  },

  deleteToken: async (token) => {
    return await prisma.token.delete({
      where: { token: token },
    })
  },
}

module.exports = tokenModel
