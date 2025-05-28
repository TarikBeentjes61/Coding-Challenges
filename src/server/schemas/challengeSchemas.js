const Joi = require('joi')

const challengeSchema = Joi.object({
  title: Joi.string().pattern(/^[\d\w\s]/).min(6).max(2000).required().messages({
    'string.empty': 'Title cannot be empty',
    'string.pattern.base': 'Title can only contain letters, numbers, and spaces',
    'string.min': 'Title must be at least 6 characters long',
    'string.max': 'Title cannot exceed 32 characters',
  }),
  description: Joi.string().min(10).max(2000).required().messages({
    'string.empty': 'Description cannot be empty',
    'string.min': 'Description must be at least 10 characters long',
    'string.max': 'Description cannot exceed 2000 characters',
  }),
  difficulty: Joi.string().valid('easy', 'medium', 'hard').required().messages({
    'any.only': 'Difficulty must be one of easy, medium, or hard',
  }),
  solution: Joi.string().min(1).max(2000).required().messages({
    'string.empty': 'Solution cannot be empty',
    'string.min': 'Solution must be at least 1 character long',
    'string.max': 'Solution cannot exceed 2000 characters',
  }),
});
const solveChallengeSchema = Joi.object({
  userId: Joi.string().required().messages({
    'any.required': 'User ID is required',
  }),
  challengeId: Joi.string().required().messages({
    'any.required': 'Challenge ID is required',
  }),
  solution: Joi.string().min(1).max(2000).required().messages({
    'string.empty': 'Solution cannot be empty',
    'string.min': 'Solution must be at least 1 character long',
    'string.max': 'Solution cannot exceed 2000 characters',
  }),
});

module.exports = {challengeSchema, solveChallengeSchema};
