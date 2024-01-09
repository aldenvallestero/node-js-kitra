const Joi = require('joi');

module.exports.findTreasureSchema = Joi.object({
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  distance: Joi.number().valid(1, 10).required(),
  prize_value: Joi.number().integer().min(10).max(30).optional(),
});

module.exports.createTreasureSchema = Joi.object({
  id: Joi.number().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  name: Joi.string().required(),
  prize_value: Joi.array().items(Joi.number().integer().min(10).max(30)).max(5).required(),
});