const tokenModel = require('../models/tokens')
const UserModel = require('../models/users')

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
}

module.exports = tokenValidationService
