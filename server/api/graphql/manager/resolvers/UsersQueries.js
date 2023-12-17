const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const UsersQueries = {
  users: async () => {

    return await prisma.user.findMany();
  },
  user: async (parent, args, context) => {

    return await prisma.user.findUnique({
      where: { id: parseInt(args.id) },
    });
  },
};

module.exports = UsersQueries;