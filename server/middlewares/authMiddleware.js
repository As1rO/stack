const jwt = require('jsonwebtoken')
require('dotenv').config()
const namespace = require('../utils/clsNamespace')

function checkAuth(req) {
  const authorization = req.headers.authorization || ''

  if (!authorization) {
    return null
  }

  const token = authorization.split('Bearer ')[1]

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    namespace.set('user', decoded)

    req.user = decoded
    return decoded
  } catch (error) {
    return null
  }
}

module.exports = { checkAuth }
