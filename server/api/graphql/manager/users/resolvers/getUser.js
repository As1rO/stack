const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    user: async (_, args) => {
      return await prisma.user.findUnique({
        where: { id: parseInt(args.id) },
      });
    },
  },
};

module.exports = resolvers;