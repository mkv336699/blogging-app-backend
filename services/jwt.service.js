const jwt = require('jsonwebtoken');

const generateAuthToken = (user) => {
    if (!user) return null;
    const u = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImageURL: user.profileImageURL,
    }
    const token = jwt.sign(u, process.env.SECRET_KEY, { expiresIn: 60 * 60 });
    return token;
}

module.exports = {
    generateAuthToken
}