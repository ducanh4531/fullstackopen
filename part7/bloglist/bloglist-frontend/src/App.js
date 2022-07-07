import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import { Button, Navbar, Nav } from "react-bootstrap";

import usersService from "./services/users";
import Users, { User } from "./components/Users";
import Blogs, { Blog } from "./components/Blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { initializeBlog } from "./reducers/blogReducer";
import { signOut } from "./reducers/loginReducer";
import "./index.css";

const App = () => {
	const blogFormRef = useRef();
	const [users, setUsers] = useState([]);
	const [comment, setComment] = useState("");
	const blogs = useSelector((state) => state.blogs);
	const singleUser = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		usersService.getAll().then((initialUsers) => setUsers(initialUsers));
	}, []);

	useEffect(() => {
		dispatch(initializeBlog());
	}, [dispatch]);

	const handleLogout = () => {
		window.localStorage.removeItem("loggedBlogappUser");
		// window.localStorage.clear();
		dispatch(signOut());
	};

	const matchUser = useMatch("/users/:id");
	const user = matchUser
		? users.find((user) => user.id == matchUser.params.id)
		: null;

	const matchBlog = useMatch("/blogs/:id");
	const blog = matchBlog
		? blogs.find((blog) => blog.id == matchBlog.params.id)
		: null;

	if (!singleUser) {
		return (
			<div className="container">
				<h2>Log in to application</h2>
				<Notification />
				<LoginForm />
			</div>
		);
	}

	return (
		<div className="container">
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="#" as="span">
							<Link to={"/"}>blogs</Link>
						</Nav.Link>
						<Nav.Link href="#" as="span">
							<Link to={"/users"}>users</Link>
						</Nav.Link>
						<Nav.Link href="#" as="span">
							<p>{singleUser.name} logged in</p>
						</Nav.Link>
						<Nav.Link href="#" as="span">
							<Button onClick={handleLogout}>logout</Button>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<h2>blog app</h2>
			<Notification />

			<Routes>
				<Route path="/users/:id" element={<User user={user} />} />
				<Route
					path="/blogs/:id"
					element={
						<Blog
							blog={blog}
							userInfo={singleUser}
							comment={comment}
							setComment={setComment}
						/>
					}
				/>
				<Route path="/users" element={<Users users={users} />} />
				<Route
					path="/"
					element={
						<>
							<Togglable
								buttonLabel={"create new"}
								ref={blogFormRef}
							>
								<BlogForm
									blogFormRef={blogFormRef}
									userInfo={singleUser}
								/>
							</Togglable>
							<Blogs />
						</>
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
