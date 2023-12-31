function welcomeMapper(user) {
  console.log(user)
  return {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  }
}

module.exports = { welcomeMapper }
