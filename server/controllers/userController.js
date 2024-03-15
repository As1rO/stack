const bcrypt = require('bcryptjs')
const UserModel = require('../models/users')
const tokenModel = require('../models/tokens')
const userValidationSchema = require('../validations/userValidation')
const validate = require('../utils/validate')
const { sendEmail } = require('../services/email')
const { generateToken } = require('../utils/generateToken')
const { welcomeMapper } = require('../mappers/emails/welcome')
const { resetPasswordMapper } = require('../mappers/emails/resetPassword')

const userController = {
  createUser: async (userData) => {
    validate(userValidationSchema.user, userData)

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userData.password, salt)
    const newUser = {
      ...userData,
      password: hashedPassword,
    }
    const createdUser = await UserModel.createUser(newUser)

    const validationToken = generateToken()
    await tokenModel.createToken({
      user_id: createdUser.id,
      token: validationToken,
      type: 'validation',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })

    const emailData = welcomeMapper(createdUser, validationToken)

    await sendEmail(
      '../templates/emails/welcome.ejs',
      emailData,
      createdUser.email,
      'Bienvenue sur Notre Application!'
    )

    return createdUser
  },

  requestPasswordReset: async (email) => {
    const user = await UserModel.findByEmail(email)
    if (!user) {
      throw new Error('Utilisateur non trouvé')
    }

    const resetToken = generateToken()
    await tokenModel.createToken({
      user_id: user.id,
      token: resetToken,
      type: 'resetPassword',
      expiresAt: new Date(Date.now() + 3600000), // 1h
    })
    const emailData = resetPasswordMapper(resetToken)
    await sendEmail(
      '../templates/emails/resetPassword.ejs',
      emailData,
      user.email,
      'Réinitialisation de votre mot de passe'
    )

    return 'email send'
  },

  resetPassword: async (token, newPassword) => {
    validate(userValidationSchema.resetPassword, { token, newPassword })

    const tokenRecord = await tokenModel.findToken(token)
    if (!tokenRecord || new Date() > tokenRecord.expiresAt) {
      throw new Error('Token invalide ou expiré')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    await UserModel.updateUserPassword(tokenRecord.user_id, hashedPassword)

    await tokenModel.deleteToken(token)

    return 'password updated'
  },

  editUser: async (userData) => {
    validate(userValidationSchema.editUser, userData)

    return await UserModel.updateUser(userData)
  },
}

module.exports = userController
