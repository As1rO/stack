const AppError = require('./AppError')

class EmailError extends AppError {
  constructor(message) {
    super(message, 500)
  }
}

module.exports = EmailError
