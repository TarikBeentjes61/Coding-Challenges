const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const JWT_SECRET = process.env.JWT_SECRET || 'secret key';
const { registerSchema, loginSchema } = require('../schemas/userSchemas');

exports.registerUser = async (req, res, next) => {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
        throw new Error(error.details[0].message);
    }
    try {
        const newUser = await userService.registerUser(value);
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1d' });

        res.json({ message: 'User registered successfully', token, user: newUser});
    } catch (error) {
        next(error);
    }
};

exports.loginUser = async (req, res, next) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        throw new Error(error.details[0].message);
    }
    try {
        const user = await userService.loginUser(value);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ message: 'User logged in successfully', token, user});
    } catch (error) {
        next(error);
    }
};

exports.getUserProfile = async (req, res, next) => {
    const { username } = req.params;
    if (typeof username !== 'string' || !/^[a-zA-Z0-9]+$/.test(username)) {
        return res.status(400).json({ message: 'Invalid username' });
    }
    try {
        const userProfile = await userService.getUserByName(username);
        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(userProfile);
    } catch (error) {
        next(error);
    }
};

