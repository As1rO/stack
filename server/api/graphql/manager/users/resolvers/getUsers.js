const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users:  async (parent, args, context) => {

    if (!context.user) {
        throw new Error('unauthenticated');
    }

    return await prisma.user.findMany();
    },
  },
};

module.exports = resolvers;