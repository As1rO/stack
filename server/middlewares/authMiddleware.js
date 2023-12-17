const jwt = require('jsonwebtoken')
require('dotenv').config()

function checkAuth(req) {
  const authorization = req.headers.authorization || ''

  if (!authorization) {
    return null
  }

  const token = authorization.split(' ')[1]

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
  } catch (error) {
    return null
  }
}

module.exports = { checkAuth }
