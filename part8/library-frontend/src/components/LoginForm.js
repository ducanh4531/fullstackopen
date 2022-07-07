import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { LOGIN } from "../queries";

const LoginForm = ({ setToken, show, setPage }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [login, result] = useMutation(LOGIN);

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value;
			setToken(token);
			localStorage.setItem("user-token", token);
		}
	}, [result.data]); //eslint-disable-line

	const onSubmit = async (event) => {
		event.preventDefault();
		login({ variables: { username, password } });
		setPage("books");
		setUsername("");
		setPassword("");
	};

	if (!show) {
		return null;
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div>
					name
					<input
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>

				<button type="submit">login</button>
			</form>
		</div>
	);
};

export default LoginForm;
