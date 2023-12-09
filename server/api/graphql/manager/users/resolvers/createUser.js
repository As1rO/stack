const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
  },
  Mutation: {
    createUser: async (_, args) => {
      return await prisma.user.create({
        data: args,
      });
    },
  },
};

module.exports = resolvers;
