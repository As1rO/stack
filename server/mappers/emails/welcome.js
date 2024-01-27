function welcomeMapper(user, token) {
  return {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    token,
  }
}

module.exports = { welcomeMapper }
