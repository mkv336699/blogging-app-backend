const Blog = require('../models/blog');

const handleCreateBlog = async (req, res) => {
    try {
        if (!(req.body.title && req.body.body && req.body.createdBy))
            return res.status(400).json({ error: "Invalid payload" });
        console.log(req.file);
        const result = await Blog.insertOne({...req.body, coverImageURL: `uploads/${req.file.filename}`});
        if (result) return res.status(201).json({ msg: "success", data: result });
        return res.status(400).json({ error: "Something went wrong" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const handleGetAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        return res.json({ data: blogs });
    } catch (err) {
        return res.json(err);
    }
}

module.exports = {
    handleCreateBlog,
    handleGetAllBlogs
}