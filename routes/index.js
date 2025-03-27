const { Router } = require('express');
const userRoutes = require('./users');
const blogRoutes = require('./blogs');
const commentRoutes = require('./comments');
const router = Router();

// Logger 
router.use((req, res, next) => {
    console.log(req.url, Date.now());
    next();
});

router.use('/api/users', userRoutes);
router.use('/api/blogs', blogRoutes);
router.use('/api/comments', commentRoutes);

module.exports = router;
