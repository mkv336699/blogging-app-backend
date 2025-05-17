const { Router } = require('express');
const { authenticate } = require('../middlewares/jwt')
const { handleCreateUser, handleLogin, handleTokenRefresh, handleUpdateProfilePic } = require('../controllers/users');
const { userUpload } = require('../services/multer-config');

const router = Router();

router.get('/', authenticate, (req, res) => {
    res.json({ msg: "success", user: req.body.user });
});

router.post('/', handleCreateUser);
router.post('/login', handleLogin);
router.get('/refresh-token', handleTokenRefresh);
router.patch('/update-profile-pic', [authenticate, userUpload.single('profileImageURL')], handleUpdateProfilePic);

module.exports = router;