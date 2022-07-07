import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

import { createBlog, updateBlog } from "../reducers/blogReducer";
import { showNotificationWithTimeout } from "../reducers/notificationReducer";

const BlogForm = ({ blogFormRef, userInfo }) => {
	const blogs = useSelector((state) => state.blogs);

	const dispatch = useDispatch();

	const blogObject = {
		title: "",
		author: "",
		url: "",
		likes: 0,
		user: null,
	};

	const [newBlog, setNewBlog] = useState(blogObject);

	const addBlog = (event) => {
		blogFormRef.current.toggleVisibility();
		event.preventDefault();

		const blogTitles = blogs.map((blog) => blog.title.toLowerCase());

		if (blogTitles.includes(newBlog.title)) {
			const blogToChange = blogs.find(
				(blog) => blog.title.toLowerCase() === newBlog.title
			);

			const changedBlog = {
				...blogToChange,
				author: newBlog.author,
				url: newBlog.url,
			};

			dispatch(
				showNotificationWithTimeout(
					`a new blog ${changedBlog.title} by ${userInfo.name} updated`,
					3000
				)
			);
			dispatch(updateBlog(blogToChange.id, changedBlog));
			setNewBlog(blogObject);
			return;
		}

		const blogForCreate = {
			title: newBlog.title,
			author: newBlog.author,
			url: newBlog.url,
		};

		dispatch(createBlog(blogForCreate))
			.then(
				dispatch(
					showNotificationWithTimeout(
						`a new blog ${blogForCreate.title} by ${userInfo.name} added`,
						3000
					)
				)
			)
			.catch((err) => {
				dispatch(
					showNotificationWithTimeout(err.response.data.error, 3000)
				);
			});
		setNewBlog(blogObject);
	};

	const handleBlogChange = (event) => {
		const { name, value } = event.target;
		setNewBlog({ ...newBlog, [name]: value });
	};

	return (
		<>
			<h2>create new</h2>
			<Form className="formDiv" onSubmit={addBlog}>
				<Form.Group>
					<Form.Label>title: </Form.Label>
					<Form.Control
						id="title"
						name="title"
						onChange={handleBlogChange}
						value={newBlog.title}
					/>
					<Form.Label>author: </Form.Label>
					<Form.Control
						id="author"
						name="author"
						onChange={handleBlogChange}
						value={newBlog.author}
					/>
					<Form.Label>url: </Form.Label>
					<Form.Control
						id="url"
						name="url"
						onChange={handleBlogChange}
						value={newBlog.url}
					/>
					<Button type="submit">create</Button>
				</Form.Group>
			</Form>
		</>
	);
};

BlogForm.propTypes = {
	blogFormRef: PropTypes.object.isRequired,
	userInfo: PropTypes.object.isRequired,
};

export default BlogForm;
