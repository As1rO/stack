const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')
const { ValidationError } = require('../errors')

require('dotenv').config()

const prisma = new PrismaClient()

async function loginUser(email, password) {
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    throw new ValidationError('Utilisateur non trouvé.')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new ValidationError('Password not match')
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })

  return { user, token }
}

module.exports = { loginUser }
