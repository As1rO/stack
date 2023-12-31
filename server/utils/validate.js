const { ValidationError } = require('../errors')

const validate = (schema, data) => {
  const { error } = schema.validate(data)
  if (error) {
    throw new ValidationError(error.details[0].message)
  }
}

module.exports = validate
