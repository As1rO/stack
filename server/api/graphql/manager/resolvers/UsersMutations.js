const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { loginUser } = require('../../../../services/login');
const prisma = new PrismaClient();

const UsersMutations = {
  createUser: async (_, args) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(args.password, salt);
    return await prisma.user.create({
      data: {
        ...args,
        password: hashedPassword,
      },
    });
  },
  login: async (_, args) => {
    return loginUser(args.email, args.password);
  },
};

module.exports = UsersMutations;
