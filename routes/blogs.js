const { Router } = require('express');
const { handleCreateBlog } = require('../controllers/blogs');
const router = Router();

router.post("/", handleCreateBlog);

module.exports = router;