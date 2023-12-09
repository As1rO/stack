const userSchema = require('./manager/users/schemas/users');
const userResolver = require('./manager/users/resolvers/createUser');

module.exports = {
  schemas: [userSchema],
  resolvers: [userResolver]
};