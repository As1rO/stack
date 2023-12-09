const userSchema = require('./users/schemas/users');
const userCreate = require('./users/resolvers/createUser');
const userLogin = require('./users/resolvers/loginUser');

module.exports = {
  schemas: [userSchema],
  resolvers: [userCreate, userLogin]
};