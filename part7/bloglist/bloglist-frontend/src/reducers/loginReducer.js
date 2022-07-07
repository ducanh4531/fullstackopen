import loginService from "../services/login";
import blogService from "../services/blogs";

const loginReducer = (state = null, action) => {
	switch (action.type) {
		case "SIGN_IN":
			return action.user;
		case "LOGGED_IN":
			return action.user;
		case "SIGN_OUT":
			return null;
		default:
			return state;
	}
};

export const signIn = (username, password) => {
	return async (dispatch) => {
		const user = await loginService.login({ username, password });
		window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
		blogService.setToken(user.token);
		dispatch({ type: "SIGN_IN", user });
	};
};

export const loggedIn = (user) => {
	return { type: "LOGGED_IN", user };
};

export const signOut = () => {
	return { type: "SIGN_OUT" };
};

export default loginReducer;
