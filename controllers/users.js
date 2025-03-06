const User = require('../models/user');
const { generateAuthToken } = require('../services/jwt.service');

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

module.exports = {
    handleCreateUser,
    handleLogin
}