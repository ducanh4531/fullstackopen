import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog, modifyBlog, blogs }) => {
	const blogObject = {
		title: "",
		author: "",
		url: "",
		likes: 0,
		user: null,
	};

	const [newBlog, setNewBlog] = useState(blogObject);

	const addBlog = (event) => {
		event.preventDefault();

		const blogTitles = blogs.map((blog) => blog.title.toLowerCase());

		if (blogTitles.includes(newBlog.title)) {
			const updateBlog = blogs.find(
				(blog) => blog.title.toLowerCase() === newBlog.title
			);

			const changedBlog = {
				...updateBlog,
				author: newBlog.author,
				url: newBlog.url,
			};

			modifyBlog(updateBlog.id, changedBlog);
			setNewBlog(blogObject);

			return;
		}

		const blogForCreate = {
			title: newBlog.title,
			author: newBlog.author,
			url: newBlog.url,
		};

		createBlog(blogForCreate);
		setNewBlog(blogObject);
	};

	const handleBlogChange = (event) => {
		const { name, value } = event.target;
		setNewBlog({ ...newBlog, [name]: value });
	};

	return (
		<>
			<h2>create new</h2>
			<form className="formDiv" onSubmit={addBlog}>
				<div>
					title:{" "}
					<input
						id="title"
						name="title"
						onChange={handleBlogChange}
						value={newBlog.title}
					/>
				</div>
				<div>
					author:{" "}
					<input
						id="author"
						name="author"
						onChange={handleBlogChange}
						value={newBlog.author}
					/>
				</div>
				<div>
					url:{" "}
					<input
						id="url"
						name="url"
						onChange={handleBlogChange}
						value={newBlog.url}
					/>
				</div>
				<div>
					<button type="submit">create</button>
				</div>
			</form>
		</>
	);
};

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired,
	modifyBlog: PropTypes.func.isRequired,
	blogs: PropTypes.array.isRequired,
};

export default BlogForm;
