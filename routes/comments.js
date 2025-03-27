const { Router } = require('express');
const { authenticate } = require('../middlewares/jwt');
const { handleGetAllComments, handleAddComments } = require('../controllers/comments');

const router = Router();

router.get("/:id", authenticate, handleGetAllComments);
router.post("/", authenticate, handleAddComments);

module.exports = router;