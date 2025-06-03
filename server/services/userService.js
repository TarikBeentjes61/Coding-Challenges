const { getDB } = require('../config/db');
const db = getDB();
const usersCollection = db.collection('users');
const bcrypt = require('bcryptjs');
const { convertToObjectId, getCurrentDate, formatUser } = require('../utils/utils');

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
        profilePicture: '',
        reputation: 0
    }; 
    await usersCollection.insertOne(userData);
    const user = await usersCollection.findOne({ username });
    return formatUser(user);
}

exports.loginUser = async ({ username, password }) => {    
    const user = await usersCollection.findOne({ username });
    if (!user) throw new Error('Incorrect credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Incorrect credentials');
    return formatUser(user);
}
exports.getUserById = async (userId) => {
    const userIdObj = convertToObjectId(userId);
    const user = await usersCollection.findOne({ _id: userIdObj });
    if (!user) throw new Error('User not found');
    return formatUser(user);
}
exports.getUserByName = async (username) => {
    const user = await usersCollection.findOne({ username: username});
    if (!user) throw new Error('User not found');
    return formatUser(user);
}
exports.incrementReputation = async (userId, amount) => {
    const userIdObj = convertToObjectId(userId);
    const result = await usersCollection.updateOne(
        { _id: userIdObj },
        { $inc: { reputation: amount } }
    );
    if (result.modifiedCount === 0) {
        throw new Error('Failed to update reputation');
    }
    return true;
}
exports.updateUserBanner = async (id, bannerPath) => {
    await usersCollection.updateOne(
        { _id: id },
        { $set: { banner: bannerPath } }
    );
}
