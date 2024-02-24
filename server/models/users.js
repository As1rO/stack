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

  findByEmail: async (email) => {
    return await prisma.user.findUnique({
      where: { email: email },
    })
  },

  findUserByToken: async (token) => {
    const user = await prisma.user.findFirst({
      where: {
        Tokens: {
          some: {
            token: token,
          },
        },
      },
    })
    return user
  },

  createUser: async (userData) => {
    return await prisma.user.create({
      data: userData,
    })
  },

  updateUserVerification: async (user_id, isVerified) => {
    return await prisma.user.update({
      where: { id: user_id },
      data: { isVerified: isVerified },
    })
  },

  updateUserPassword: async (user_id, newPassword) => {
    return await prisma.user.update({
      where: { id: user_id },
      data: { password: newPassword },
    })
  },

  updateUser: async (userData) => {
    const { uuid, ...updateData } = userData
    return await prisma.user.update({
      where: { uuid: uuid },
      data: updateData,
    })
  },
}

module.exports = UserModel
