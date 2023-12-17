const bcrypt = require('bcryptjs')
const UserModel = require('../models/users')
const userValidationSchema = require('../validations/userValidation')
const validate = require('../utils/validate')

const userController = {
  createUser: async (userData) => {
    validate(userValidationSchema, userData)

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userData.password, salt)
    const newUser = {
      ...userData,
      password: hashedPassword,
    }
    return await UserModel.createUser(newUser)
  },
}

module.exports = userController
