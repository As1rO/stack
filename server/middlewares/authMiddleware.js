const jwt = require('jsonwebtoken');

function checkAuth(context) {
  const token = context.req.cookies['auth-token'];
  if (!token) {
    throw new Error('Non authentifié');
  }

  try {
    const user = jwt.verify(token, 'SECRET_KEY');
    return user;
  } catch (err) {
    throw new Error('Non authentifié');
  }
}

module.exports = { checkAuth };