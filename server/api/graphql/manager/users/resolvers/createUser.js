const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const resolvers = {
  Mutation: {
    createUser: async (_, args) => {
      // Crypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);

      return await prisma.user.create({
        data: {
          ...args,
          password: hashedPassword,
        },
      });
    },
  },
};

module.exports = resolvers;
