const Joi = require('joi');

const findTreasureSchema = Joi.object({
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  distance: Joi.number().required(),
});

module.exports.findTreasureValidation = (req, res, next) => {
  const errors = [];
  const { value, error } = findTreasureSchema.validate(req.body);
  if (error) {
    error?.details.forEach((i) => {
      errors.push(i.message);
    });
    return res.status(400).send({ errors });
  }
  next();
};
