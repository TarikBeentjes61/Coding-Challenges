const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(6).max(30).required().messages({
    'string.empty': 'Username cannot be empty',
    'string.min': 'Username must be at least 6 characters long',
    'string.max': 'Username cannot exceed 30 characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required().messages({
    'string.empty': 'Password cannot be empty',
    'string.pattern.base': 'Password must be between 6 to 30 characters long',
    'any.required': 'Password is required',
  }),
});

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(6).max(30).required().messages({
    'string.empty': 'Username cannot be empty',
    'string.min': 'Username must be at least 6 characters long',
    'string.max': 'Username cannot exceed 30 characters',
    'any.required': 'Username is required',
  }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required().messages({
    'string.empty': 'Password cannot be empty',
    'string.pattern.base': 'Password must be between 6 to 30 characters long',
    'any.required': 'Password is required',
  }),
});
module.exports = { registerSchema, loginSchema };