import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
	switch (action.type) {
		case "INIT_BLOGS":
			return action.data;
		case "ADD_BLOG":
			return [...state, action.data];
		case "UPDATE_BLOG":
			return state.map((blog) =>
				blog.id !== action.data.id ? blog : action.data
			);
		case "DELETE_BLOG":
			return state.filter((blog) => blog.id !== action.id);
		default:
			return state;
	}
};

export const initializeBlog = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		return dispatch({ type: "INIT_BLOGS", data: blogs });
	};
};

export const createBlog = (newBlog) => {
	return async (dispatch) => {
		const createdBlog = await blogService.create(newBlog);
		dispatch({ type: "ADD_BLOG", data: createdBlog });
	};
};

export const updateBlog = (id, changeBlog) => {
	return async (dispatch) => {
		const changedBlog = await blogService.update(id, changeBlog);
		dispatch({ type: "UPDATE_BLOG", data: changedBlog });
	};
};

export const deleteBlog = (id) => {
	return async (dispatch) => {
		blogService.deleteBlog(id);
		dispatch({ type: "DELETE_BLOG", id });
	};
};

export default blogReducer;
