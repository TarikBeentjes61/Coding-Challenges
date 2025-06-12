const { ObjectId } = require('mongodb');

function convertToObjectId(id) {
  if (ObjectId.isValid(id)) {
    return new ObjectId(String(id));
  }
  return undefined;
}

function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatUser(user) {
    return {
        username: user.username,
        registerDate: user.registerDate,
        bio: user.bio || '',
        profilePicture: user.profilePicture || '',
        lastLoggedIn: user.lastLoggedIn,
        reputation: user.reputation || 0,
        banner: user.banner || '',
        _id: user._id
    };
}

module.exports = {
  convertToObjectId, getCurrentDate, formatUser
};
