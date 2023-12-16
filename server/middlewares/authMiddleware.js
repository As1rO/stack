const jwt = require('jsonwebtoken');
require('dotenv').config();

function checkAuth(req) {

  const authorization = req.headers.authorization || '';

  if (!authorization) {
    throw new Error('Authorization header not found');
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    throw new Error('Token not found');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; 
  } catch (error) {
    throw new Error('Invalid token');
  }
}

module.exports = { checkAuth };
