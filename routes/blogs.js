const { Router } = require('express');
const { handleCreateBlog, handleGetAllBlogs } = require('../controllers/blogs');
const { authenticate } = require('../middlewares/jwt');
const { upload } = require('../services/multer-config');

const router = Router();

router.get("/", handleGetAllBlogs);
router.post("/", [authenticate, upload.single('coverImageURL')], handleCreateBlog);

module.exports = router;