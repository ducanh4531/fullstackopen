const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

// Get all data
blogsRouter.get("/", async (req, res) => {
	const blogs = await Blog.find({}).populate("user", {
		username: 1,
		name: 1,
	});
	res.json(blogs);
});

// Get single data
blogsRouter.get("/:id", async (req, res) => {
	const blog = await Blog.findById(req.params.id);
	if (blog) {
		return res.json(blog);
	} else {
		return res.status(404).end();
	}
});

// Create new data
blogsRouter.post("/", middleware.userExtractor, async (req, res, next) => {
	const body = req.body;
	const user = req.user;

	const userObject = await User.findById(user.id);

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes | 0,
		user: userObject._id,
	});

	const savedBlog = await blog.save();
	userObject.blogs = userObject.blogs.concat(savedBlog._id);

	await userObject.save();
	res.status(201).json(savedBlog);
});

// Update single data
blogsRouter.put("/:id", async (req, res) => {
	const body = req.body;

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes | 0,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
		new: true,
	});
	res.json(updatedBlog);
});

// Delete single data
blogsRouter.delete("/:id", middleware.userExtractor, async (req, res) => {
	const user = req.user;
	const blog = await Blog.findById(req.params.id);

	if (blog.user.toString() === user.id.toString()) {
		await Blog.findByIdAndRemove(req.params.id);
		res.status(200).end();
	} else {
		res.status(401).json({ error: "can not delete this blog" });
	}
});

module.exports = blogsRouter;
