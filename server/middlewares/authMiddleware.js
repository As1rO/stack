const jwt = require('jsonwebtoken');
require('dotenv').config();

function checkAuth(req) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    throw new Error('Non authentifié');
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (err) {
    throw new Error('Non authentifié');
  }
}

module.exports = { checkAuth };
