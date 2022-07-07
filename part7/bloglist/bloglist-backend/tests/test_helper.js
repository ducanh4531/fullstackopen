const Blog = require("../models/blog");
const User = require("../models/user");
const mongoose = require("mongoose");

const initialBlogs = [
	{
		title: "Front-end",
		author: "Anton",
		url: "a",
		likes: 15,
		user: mongoose.Types.ObjectId("61c48b31dfda93b2998ecbd1"),
	},
	{
		title: "Back-end",
		author: "Sam",
		url: "b",
		likes: 8,
		user: mongoose.Types.ObjectId("61c48b31dfda93b2998ecbd1"),
	},
];

const nonExistingId = async () => {
	const blog = new Blog({
		title: "beRemoved",
		author: "Dan",
		url: "c",
		likes: 3,
	});

	await blog.save();
	await blog.remove();

	return blog._id.toString();
};

const blogInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const userInDb = async () => {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
};

module.exports = {
	initialBlogs,
	nonExistingId,
	blogInDb,
	userInDb,
};
