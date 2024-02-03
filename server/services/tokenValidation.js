const tokenModel = require('../models/tokens')
const UserModel = require('../models/users')
const jwt = require('jsonwebtoken')
const { ValidationError } = require('../errors')

const tokenValidationService = {
  validateToken: async (token) => {
    const tokenRecord = await tokenModel.findToken(token)

    if (!tokenRecord || new Date() > tokenRecord.expiresAt) {
      throw new Error('Token invalide ou expiré')
    }

    await UserModel.updateUserVerification(tokenRecord.userId, true)
    await tokenModel.deleteToken(token)

    return 'Compte vérifié avec succès'
  },
  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(new ValidationError('Token invalide'))
        } else {
          resolve(true)
        }
      })
    })
  },
}

module.exports = tokenValidationService
