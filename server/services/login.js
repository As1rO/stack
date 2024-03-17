const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')
const { ValidationError } = require('../errors')
const AccountModel = require('~/models/accounts')
const UserModel = require('~/models/users')

require('dotenv').config()

const prisma = new PrismaClient()

async function loginUser(email, password) {
  const user = await UserModel.findByEmail(email)

  if (!user) {
    throw new ValidationError('Utilisateur non trouvé.')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new ValidationError('Password not match')
  }

  const account_id = await AccountModel.accountByUserId(user.id)

  const context = { user_id: user.id, account_id: account_id.id }

  const token = jwt.sign(context, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })

  return { user, token }
}

module.exports = { loginUser }
