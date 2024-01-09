const Joi = require('joi');

const findTreasureSchema = Joi.object({
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  distance: Joi.number().valid(1, 10).required(),
  prize_value: Joi.number().integer().min(10).max(30).optional(),
});

const createTreasureSchema = Joi.object({
  id: Joi.number().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  name: Joi.string().required(),
  prize_value: Joi.array().items(Joi.number().integer().min(10).max(30)).max(5).required(),
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

module.exports.createTreasureValidation = (req, res, next) => {
  const errors = [];
  const { value, error } = createTreasureSchema.validate(req.body);
  if (error) {
    error?.details.forEach((i) => {
      errors.push(i.message);
    });
    return res.status(400).send({ errors });
  }
  next();
};
