const Joi = require("joi");

module.exports.entrySchema = Joi.object({
  label: Joi.string().max(30).required(),
  description: Joi.string().min(6).max(50).required(),
  content: Joi.string().required(),
  emoji: Joi.string().length(2).required(),
  date: Joi.string().required(),
  time: Joi.string().required(),
  card_id: Joi.string().required(),
  image: Joi.alternatives().try(
    Joi.object({
      url: Joi.string().uri(),
      filename: Joi.string(),
    }),
    Joi.allow(null)
  ),
});

module.exports.registerSchema = Joi.object({
  username: Joi.string().required().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

module.exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
