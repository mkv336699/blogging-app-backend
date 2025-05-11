const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(400).json({ error: "No token provided" });
        return;
    }
    jwt.verify(req.headers.authorization, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(400).json({ error: err.message || "Invalid token" });
            return;
        }

        req.user = {
            _id: decoded._id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
            profileImageURL: decoded.profileImageURL, 
        }
        next();
    });
}

module.exports = {
    authenticate
}