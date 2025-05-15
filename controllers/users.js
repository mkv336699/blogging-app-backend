const User = require('../models/user');
const { generateAuthToken } = require('../services/jwt.service');
const jwt = require('jsonwebtoken');

const handleCreateUser = async (req, res) => {
    try {
        if (!(req.body.name && req.body.email && req.body.password))
            return res.status(400).json({ error: "Missing or invalid payload" });
        
        const result = await User.insertOne(req.body);
        res.json(result);
    } catch(err) {
        console.log(err.message);
        res.status(400).json({ error: err.message });
    }
}

const handleLogin = async (req, res) => {
    try {
        if (!(req.body.email && req.body.password))
            res.json({ error: "Missing email or password" });

        const result = await User.matchPassword(req.body.email, req.body.password);
        if (result) {
            const authToken = await generateAuthToken(result);
            res.json({ ...result, password: undefined, salt: undefined, authToken });
        } else {
            res.json({ error: "Invalid email or password" });
        }
    } catch(err) {
        console.log(err);
        res.json({ errors: err })
    }
}

const handleTokenRefresh = async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(400).json({ error: "No token provided" });
        }

        const token = req.headers.authorization;
        
        // Try to verify the token
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                // Check if the error is specifically due to token expiration
                if (err.name === 'TokenExpiredError') {
                    try {
                        // Decode the token without verification to get the payload
                        const decodedPayload = jwt.decode(token);
                        
                        if (!decodedPayload || !decodedPayload._id) {
                            return res.status(498).json({ 
                                error: "Invalid token payload",
                                message: "Please login again" 
                            });
                        }

                        // Fetch user from database using the ID from the expired token
                        const user = await User.findById(decodedPayload._id);
                        
                        if (!user) {
                            return res.status(498).json({ 
                                error: "User not found",
                                message: "Please login again" 
                            });
                        }

                        // Generate new token with fresh user data
                        const newToken = generateAuthToken(user);
                        return res.json({ 
                            message: "Token refreshed successfully",
                            authToken: newToken 
                        });
                    } catch (decodeError) {
                        console.error("Error decoding expired token:", decodeError);
                        return res.status(498).json({ 
                            error: "Invalid token",
                            message: "Please login again" 
                        });
                    }
                }
                // For any other token error (invalid token, malformed, etc)
                return res.status(498).json({ 
                    error: "Invalid token",
                    message: "Please login again" 
                });
            }
            
            // If token is still valid, return the same token
            return res.json({ 
                message: "Token is still valid",
                authToken: token 
            });
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    handleCreateUser,
    handleLogin,
    handleTokenRefresh
}