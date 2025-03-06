const Blog = require('../models/blog');

const handleCreateBlog = async (req, res) => {
    try {
        // TODO Validations
        if (!(req.body.title && req.body.body && req.body.createdBy))
            res.status(400).json({ error: "Invalid payload" });

        const result = await Blog.insertOne(req.body);
        if (result) res.status(201).json({ msg: "success", data: result });
        res.status(400).json({ error: "Something went wrong" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    handleCreateBlog
}