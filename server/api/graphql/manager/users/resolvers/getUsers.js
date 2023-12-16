const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
  },
};

module.exports = resolvers;