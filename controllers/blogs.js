const Blog = require('../models/blog');

const handleCreateBlog = async (req, res) => {
    try {
        if (req.user) req.body.createdBy = req.user._id;
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
        let payload = {}, skip = 0, limit = 0
        if (req.body.criteria) {
            payload = req.body.criteria
        }
        if (req.body.pagination) {
            limit = req.body.pagination.recordsPerPage
            skip = (req.body.pagination.pageNumber - 1) * req.body.pagination.recordsPerPage
        }
        const blogs = await Blog.find(payload).sort({ createdAt: 'desc' }).skip(skip).limit(limit);
        return res.json({ data: blogs });
    } catch (err) {
        return res.json(err);
    }
}

const handleGetBlogById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) res.status(400).json({ error: "Invalid Id" });
        const blog = await Blog.findOne({ _id: id }).populate("createdBy");
        return res.json({ data: blog });
    } catch (err) {
        return res.json({ error: err });
    }
}

module.exports = {
    handleCreateBlog,
    handleGetAllBlogs,
    handleGetBlogById
}