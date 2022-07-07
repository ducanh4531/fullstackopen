import React from "react";
import PropTypes from "prop-types";

const LoginForm = ({ onSubmit, onChange, value }) => {
	return (
		<>
			<form id="parent" onSubmit={onSubmit}>
				<div>
					username
					<input
						id="username"
						name="username"
						onChange={onChange}
						type="text"
						value={value.username}
					/>
				</div>
				<div>
					password
					<input
						id="password"
						name="password"
						onChange={onChange}
						type="password"
						value={value.password}
					/>
				</div>
				<button id="login-button" type="submit">
					login
				</button>
			</form>
		</>
	);
};

LoginForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.object.isRequired,
};

export default LoginForm;
