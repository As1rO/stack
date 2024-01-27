const bcrypt = require('bcryptjs')
const UserModel = require('../models/users')
const tokenModel = require('../models/tokens')
const userValidationSchema = require('../validations/userValidation')
const validate = require('../utils/validate')
const { sendEmail } = require('../services/email')
const { generateToken } = require('../utils/generateToken')
const { welcomeMapper } = require('../mappers/emails/welcome')

const userController = {
  createUser: async (userData) => {
    validate(userValidationSchema, userData)

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userData.password, salt)
    const newUser = {
      ...userData,
      password: hashedPassword,
    }
    const createdUser = await UserModel.createUser(newUser)

    const validationToken = generateToken()
    await tokenModel.createToken({
      userId: createdUser.id,
      token: validationToken,
      type: 'validation',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })

    const emailData = welcomeMapper(createdUser, validationToken)
    console.log('emailData', emailData)

    // await sendEmail(
    //   '../templates/emails/welcome.ejs',
    //   emailData,
    //   createdUser.email,
    //   'Bienvenue sur Notre Application!'
    // )

    return createdUser
  },
}

module.exports = userController
