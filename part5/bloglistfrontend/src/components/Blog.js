import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, userInfo, modifyBlog, handleDelete }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		// color: "gray",
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
		fontSize: 15,
		listStyleType: "none",
		marginLeft: -40,
	};

	const [visible, setVisible] = useState(false);

	const showWhenVisible = { display: visible ? "" : "none" };
	const hideWhenVisible = { display: visible ? "none" : "" };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const handleLikeChange = () => {
		const changedBlog = {
			...blog,
			likes: blog.likes + 1,
		};

		modifyBlog(blog.id, changedBlog);
	};

	return (
		<li style={blogStyle} className="blog">
			{blog.title} {blog.author}{" "}
			<button style={showWhenVisible} onClick={toggleVisibility}>
				hide
			</button>
			<div className="hiddenDiv" style={showWhenVisible}>
				<p>{blog.url}</p>
				<p className="likeStat">
					likes <span>{blog.likes}</span>
					<button id="like-button" onClick={handleLikeChange}>
						like
					</button>
				</p>
				<p>{userInfo.name}</p>
				{blog.user.username === userInfo.username && (
					<button id="remove-button" onClick={handleDelete}>
						remove
					</button>
				)}
			</div>
			<button
				className="view-btn"
				id="view-button"
				style={hideWhenVisible}
				onClick={toggleVisibility}
			>
				view
			</button>
		</li>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	userInfo: PropTypes.object.isRequired,
	modifyBlog: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
};

export default Blog;
