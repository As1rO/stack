// server/errors/DatabaseError.js

const AppError = require('./AppError')

class DatabaseError extends AppError {
  constructor(message) {
    super(message, 500)
  }
}

module.exports = DatabaseError
