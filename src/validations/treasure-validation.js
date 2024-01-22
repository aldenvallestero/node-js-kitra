const { findTreasureSchema, createTreasureSchema } = require('./schemas')

module.exports.findTreasureValidation = (req, res, next) => {
  const errors = []
  const { value, error } = findTreasureSchema.validate(req.body)
  if (error) {
    error?.details.forEach((i) => {
      errors.push(i.message)
    })
    return res.status(400).send({ errors })
  }
  next()
}

module.exports.createTreasureValidation = (req, res, next) => {
  const errors = []
  const { value, error } = createTreasureSchema.validate(req.body)
  if (error) {
    error?.details.forEach((i) => {
      errors.push(i.message)
    })
    return res.status(400).send({ errors })
  }
  next()
}
