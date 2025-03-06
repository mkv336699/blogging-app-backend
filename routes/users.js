const { Router } = require('express');
const User = require('../models/user');
const { authenticate } = require('../middlewares/jwt')
const { generateAuthToken } = require('../services/jwt.service');

const router = Router();

router.get('/', authenticate, (req, res) => {
    res.json({ msg: "success asd", user: req.body.user });
});

router.post('/', async (req, res) => {
    try {
        // TODO validations
        console.log(req.body);
        const result = await User.insertOne(req.body);
        res.json(result);
    } catch(err) {
        console.log(err.message);
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
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
});

module.exports = router;