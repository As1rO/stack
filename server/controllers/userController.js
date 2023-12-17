const bcrypt = require('bcryptjs')
const UserModel = require('../models/users')

const userController = {
  createUser: async (userData) => {
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
