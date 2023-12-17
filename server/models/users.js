const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

const UserModel = {
  users: async () => {
    return await prisma.user.findMany()
  },
  user: async (id) => {
    return await prisma.user.findUnique({
      where: { id: parseInt(id) },
    })
  },

  createUser: async (userData) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userData.password, salt)
    return await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    })
  },
}

module.exports = UserModel
