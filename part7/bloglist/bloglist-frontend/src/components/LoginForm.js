import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";

import blogService from "../services/blogs";
import { showNotificationWithTimeout } from "../reducers/notificationReducer";
import { signIn, loggedIn } from "../reducers/loginReducer";

const LoginForm = () => {
	const dispatch = useDispatch();

	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});

	useEffect(() => {
		let cancel = false;
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			if (cancel) return;
			dispatch(loggedIn(user));
			blogService.setToken(user.token);
		}
		return () => {
			cancel = true;
		};
	}, []);

	const handleLogin = async (event) => {
		try {
			event.preventDefault();

			const { username, password } = credentials;
			await dispatch(signIn(username, password));
			setCredentials({ username: "", password: "" });
		} catch (err) {
			dispatch(
				showNotificationWithTimeout("wrong username or password", 3000)
			);
		}
	};

	const handleLoginChange = (event) => {
		const { name, value } = event.target;
		setCredentials({ ...credentials, [name]: value });
	};

	return (
		<>
			<Form id="parent" onSubmit={handleLogin}>
				<Form.Group>
					<Form.Label>username</Form.Label>
					<Form.Control
						id="username"
						name="username"
						onChange={handleLoginChange}
						type="text"
						value={credentials.username}
					/>
					<Form.Label>password</Form.Label>
					<Form.Control
						id="password"
						name="password"
						onChange={handleLoginChange}
						type="password"
						value={credentials.password}
					/>
					<Button id="login-button" type="submit">
						login
					</Button>
				</Form.Group>
			</Form>
		</>
	);
};

export default LoginForm;
