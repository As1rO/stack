const namespace = require('./clsNamespace')

function currentUser() {
  return namespace.get('user')
}

module.exports = { currentUser }
