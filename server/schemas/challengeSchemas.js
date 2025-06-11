const Joi = require('joi')

const createChallengeSchema = Joi.object({
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
const updateChallengeSchema = Joi.object({
  challengeId: Joi.string().required().messages({
    'any.required': 'Challenge ID is required',
  }),
  title: Joi.string().pattern(/^[\d\w\s]/).min(6).max(2000).required().messages({
  'string.empty': 'Title cannot be empty',
  'string.pattern.base': 'Title can only contain letters, numbers, and spaces',
  'string.min': 'Title must be at least 6 characters long',
  'string.max': 'Title cannot exceed 32 characters',
  }),
  description: Joi.object().max(2000).required().messages({
    'object.empty': 'Description cannot be empty',
    'object.max': 'Description cannot exceed 2000 characters',
  }), //update later
  solution: Joi.string().min(1).max(2000).required().messages({
    'string.empty': 'Solution cannot be empty',
    'string.min': 'Solution must be at least 1 character long',
    'string.max': 'Solution cannot exceed 2000 characters',
  }),
});
module.exports = {createChallengeSchema, solveChallengeSchema, updateChallengeSchema};
