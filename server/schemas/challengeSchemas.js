const Joi = require('joi');

const title = Joi.string().pattern(/^[\w\d\s]+$/).min(6).max(32).required().messages({
    'string.empty': 'Title cannot be empty',
    'string.pattern.base': 'Title can only contain letters, numbers, and spaces',
    'string.min': 'Title must be at least 6 characters long',
    'string.max': 'Title cannot exceed 32 characters',
  });

const solution = Joi.string().min(1).max(2000).required().messages({
    'string.empty': 'Solution cannot be empty',
    'string.min': 'Solution must be at least 1 character long',
    'string.max': 'Solution cannot exceed 2000 characters',
  });

const node = Joi.object({
  type: Joi.string().required(),
  content: Joi.array().items(Joi.link('#node')).optional(),
  text: Joi.string().optional(),
  marks: Joi.array().items(Joi.any()).optional(),
  attrs: Joi.object().optional(),
}).id('node');

const description = Joi.object({
  type: Joi.string().valid('doc').required(),
  content: Joi.array().items(node).min(1).required(),
})
  .required()
  .custom((value, helpers) => {
    const rawSize = JSON.stringify(value).length;
    if (rawSize > 20000) {
      return helpers.message('Description cannot exceed 20,000 characters');
    }
    return value;
  })
  .messages({
    'object.base': 'Description must be a structured object',
    'any.required': 'Description is required',
  });

const createChallengeSchema = Joi.object({
  title,
  description,
  solution,
}).unknown(false);

const solveChallengeSchema = Joi.object({
  userId: Joi.string().required().messages({
    'any.required': 'User ID is required',
  }),
  challengeId: Joi.string().required().messages({
    'any.required': 'Challenge ID is required',
  }),
  solution,
}).unknown(false);

// Need optionals here
const updateChallengeSchema = Joi.object({
  challengeId: Joi.string().required().messages({
    'any.required': 'Challenge ID is required',
  }),
  title, 
  description,
  solution,
}).unknown(false);

module.exports = {
  createChallengeSchema,
  solveChallengeSchema,
  updateChallengeSchema,
};
