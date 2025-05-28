const { getDB } = require('../config/db');
const db = getDB();
const usersCollection = db.collection('users');
const bcrypt = require('bcryptjs');
const { convertToObjectId, getCurrentDate } = require('../utils/utils');

exports.registerUser = async ({username, email, password}) => {
    const existing = await usersCollection.findOne({ username });
    if (existing) throw new Error('Username already exists');

    const hashed = await bcrypt.hash(password, 10);
    const date = getCurrentDate();
    const userData = {
        username,
        password: hashed,
        email: email,
        registerDate: date,
        lastLoggedIn: date,
        bio: '',
        profilePicture: ''
    }; 
    await usersCollection.insertOne(userData);
    const user = await usersCollection.findOne({ username });

    return { 
        username: user.username,
        registerDate: user.registerDate,
        bio: user.bio || '',
        profilePicture: user.profilePicture || '',
        lastLoggedIn: user.lastLoggedIn,
        _id: user._id 
    };
}

exports.loginUser = async ({ username, password }) => {    
    const user = await usersCollection.findOne({ username });
    if (!user) throw new Error('Incorrect credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Incorrect credentials');

    return { 
        username: user.username,
        registerDate: user.registerDate,
        bio: user.bio || '',
        profilePicture: user.profilePicture || '',
        lastLoggedIn: user.lastLoggedIn,
        _id: user._id 
    };
}
exports.getUserById = async (userId) => {
    const userIdObj = convertToObjectId(userId);
    const user = await usersCollection.findOne({ _id: userIdObj });
    if (!user) throw new Error('User not found');

    return { 
        username: user.username,
        registerDate: user.registerDate,
        bio: user.bio || '',
        profilePicture: user.profilePicture || '',
        lastLoggedIn: user.lastLoggedIn,
        _id: user._id 
    };
}
exports.getUserByName = async (username) => {
    const user = await usersCollection.findOne({ username: username});
    if (!user) throw new Error('User not found');

    return { 
        username: user.username,
        registerDate: user.registerDate,
        bio: user.bio || '',
        profilePicture: user.profilePicture || '',
        lastLoggedIn: user.lastLoggedIn,
        _id: user._id 
    };
}
