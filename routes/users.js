const { Router } = require('express');
const { authenticate } = require('../middlewares/jwt')
const { handleCreateUser, handleLogin, handleTokenRefresh } = require('../controllers/users');

const router = Router();

router.get('/', authenticate, (req, res) => {
    res.json({ msg: "success asd", user: req.body.user });
});

router.post('/', handleCreateUser);
router.post('/login', handleLogin);
router.get('/refresh-token', handleTokenRefresh);

module.exports = router;