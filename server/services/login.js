const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function loginUser(email, password) {

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('USer not Found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Password not match');
  }

  return user;
}

module.exports = { loginUser };