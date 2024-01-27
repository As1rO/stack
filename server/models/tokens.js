const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const tokenModel = {
  createToken: async (tokenData) => {
    return await prisma.token.create({
      data: tokenData,
    })
  },
}

module.exports = tokenModel
