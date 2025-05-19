const { Router } = require('express');
const { handleCreateBlog, handleGetAllBlogs, handleGetBlogById } = require('../controllers/blogs');
const { authenticate } = require('../middlewares/jwt');
const { upload } = require('../services/multer-config');

const router = Router();

router.post("/", handleGetAllBlogs);
router.get("/:id", handleGetBlogById);
router.post("/", [authenticate, upload.single('coverImageURL')], handleCreateBlog);

module.exports = router;