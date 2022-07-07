import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";

const App = () => {
	const blogFormRef = useRef();

	const [blogs, setBlogs] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});
	const [user, setUser] = useState(null);

	useEffect(() => {
		blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const { username, password } = credentials;
			const user = await loginService.login({ username, password });

			setUser(user);

			window.localStorage.setItem(
				"loggedBlogappUser",
				JSON.stringify(user)
			);

			blogService.setToken(user.token);

			setCredentials({ username: "", password: "" });
		} catch (exception) {
			setErrorMessage("wrong username or password");
			setTimeout(() => setErrorMessage(null), 3000);
		}
	};

	const modifyBlog = (id, blogObject) => {
		blogService.update(id, blogObject).then((returnedBlog) => {
			setBlogs(
				blogs.map((blog) =>
					blog.id !== returnedBlog.id ? blog : returnedBlog
				)
			);
			if (blogObject.title !== returnedBlog.title) {
				blogFormRef.current.toggleVisibility();
				setErrorMessage(
					`the blog ${returnedBlog.title} by ${user.name} updated`
				);
				setTimeout(() => setErrorMessage(null), 3000);
			}
		});
	};

	const addBlog = (blogObject) => {
		blogFormRef.current.toggleVisibility();

		blogService
			.create(blogObject)
			.then((returnedBlog) => {
				setBlogs(blogs.concat(returnedBlog));
				setErrorMessage(
					`a new blog ${returnedBlog.title} by ${user.name} added`
				);
				setTimeout(() => setErrorMessage(null), 3000);
			})
			.catch((err) => {
				// console.log(err.response);
				// console.log(err.response.data.error);
				setErrorMessage(err.response.data.error);
				setTimeout(() => setErrorMessage(null), 3000);
			});
	};

	const handleDeleteOf = (id) => {
		const blog = blogs.find((blog) => blog.id === id);
		if (window.confirm(`Remove blog ${blog.title} by ${user.name}`)) {
			blogService
				.deleteBlog(id)
				.then(() => setBlogs(blogs.filter((blog) => blog.id !== id)));

			setErrorMessage(`Deleted ${blog.title}`);
			setTimeout(() => setErrorMessage(null), 3000);
		}
	};

	const handleLoginChange = (event) => {
		const { name, value } = event.target;
		setCredentials({ ...credentials, [name]: value });
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedBlogappUser");
		// window.localStorage.clear();
		setUser(null);
	};

	if (!user) {
		return (
			<div>
				<h2>Log in to application</h2>
				<Notification message={errorMessage} />
				<LoginForm
					onSubmit={handleLogin}
					onChange={handleLoginChange}
					value={credentials}
				/>
			</div>
		);
	}

	return (
		<div>
			<h2>Blogs</h2>
			<Notification message={errorMessage} />
			<p>
				{user.name} logged in
				<button onClick={handleLogout}>logout</button>
			</p>
			<Togglable buttonLabel={"create new blog"} ref={blogFormRef}>
				<BlogForm
					createBlog={addBlog}
					modifyBlog={modifyBlog}
					blogs={blogs}
				/>
			</Togglable>
			<ul>
				{blogs
					.sort((a, b) => b.likes - a.likes)
					.map((blog) => (
						<Blog
							key={blog.id}
							blog={blog}
							userInfo={user}
							modifyBlog={modifyBlog}
							handleDelete={() => handleDeleteOf(blog.id)}
						/>
					))}
			</ul>
		</div>
	);
};

export default App;
