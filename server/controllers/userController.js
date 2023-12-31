const bcrypt = require('bcryptjs')
const UserModel = require('../models/users')
const userValidationSchema = require('../validations/userValidation')
const validate = require('../utils/validate')
const { sendEmail } = require('../services/email')
const { welcomeMapper } = require('../emails/welcome')

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

    const emailData = welcomeMapper(createdUser)

    await sendEmail(
      '../templates/emails/welcome.ejs',
      emailData,
      createdUser.email,
      'Bienvenue sur Notre Application!'
    )

    return createdUser
  },
}

module.exports = userController
