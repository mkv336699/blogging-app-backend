const Comment = require('../models/comment')

const handleGetAllComments = async (req, res) => {
    const id = req.params.id;
    if (!id) return res.json({ error: "Invalid id" });

    const comments = await Comment.find({ commentedAt: id }).populate("createdBy", "name profileImageURL").sort({createdAt: -1});
    res.json({ data: comments });
}

const handleAddComments = async (req, res) => {
    // TODO Validations
    const comment = await Comment.insertOne(req.body);
    res.json({ data: comment });
}

module.exports = {
    handleGetAllComments,
    handleAddComments
}