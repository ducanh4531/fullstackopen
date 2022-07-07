import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";

import { updateBlog, deleteBlog } from "../reducers/blogReducer";
import { showNotificationWithTimeout } from "../reducers/notificationReducer";
import blogService from "../services/blogs";

export const Blog = ({ blog, userInfo, comment, setComment }) => {
	if (!blog) {
		return null;
	}

	const dispatch = useDispatch();

	const handleLikeChange = (blog) => {
		const changeBlog = {
			...blog,
			likes: blog.likes + 1,
		};

		dispatch(updateBlog(blog.id, changeBlog));
	};

	const handleDeleteOf = (id) => {
		if (window.confirm(`Remove blog ${blog.title} by ${userInfo.name}`)) {
			dispatch(deleteBlog(id));
			dispatch(
				showNotificationWithTimeout(`Deleted ${blog.title}`, 3000)
			);
		}
	};

	const addComment = (event) => {
		event.preventDefault();
		blogService.createComment(blog.id, comment);
		dispatch(
			showNotificationWithTimeout(`added new comment ${comment}`, 3000)
		);
		setComment("");
	};

	const handleCommentChange = (event) => {
		setComment(event.target.value);
	};

	return (
		<>
			<div className="hiddenDiv">
				<h2>
					{blog.title} {blog.author}
				</h2>
				<a href={`https://${blog.url}`}>{blog.url}</a>
				<p className="likeStat">
					<span>{blog.likes}</span> likes
					<button
						id="like-button"
						onClick={() => handleLikeChange(blog)}
					>
						like
					</button>
				</p>
				<p>added by {blog.user.name}</p>
				{blog.user.username === userInfo.username && (
					<button
						id="remove-button"
						onClick={() => handleDeleteOf(blog.id)}
					>
						remove
					</button>
				)}
			</div>
			<div>
				<h2>comments</h2>
				<form onSubmit={addComment}>
					<input onChange={handleCommentChange} value={comment} />
					<button type="submit">add comment</button>
				</form>
				<ul>
					{blog.comments.map((comment, i) => (
						<li key={`${i}${comment}`}>{comment}</li>
					))}
				</ul>
			</div>
		</>
	);
};
const Blogs = () => {
	const blogs = useSelector((state) => state.blogs);

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		// color: "gray",
		// marginLeft: -40,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
		fontSize: 15,
	};

	return (
		<Table striped>
			<tbody>
				{blogs
					.sort((a, b) => b.likes - a.likes)
					.map((blog) => (
						<tr style={blogStyle} key={blog.id}>
							<td>
								<Link to={`/blogs/${blog.id}`}>
									{blog.title}{" "}
								</Link>
							</td>
							<td>{blog.author}</td>
						</tr>
					))}
			</tbody>
		</Table>
	);
};

Blog.propTypes = {
	blog: PropTypes.object,
	userInfo: PropTypes.object.isRequired,
	comment: PropTypes.string,
	setComment: PropTypes.func.isRequired,
};

export default Blogs;
