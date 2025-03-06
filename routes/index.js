const { Router } = require('express');
const userRoutes = require('./users');
const router = Router();

// Logger 
router.use((req, res, next) => {
    console.log(req.url, Date.now());
    next();
});

router.use('/api/users', userRoutes);

module.exports = router;
