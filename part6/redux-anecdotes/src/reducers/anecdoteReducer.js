import anecdoteService from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
	switch (action.type) {
		case "VOTE":
			const id = action.data.id;
			return state.map((anecdote) =>
				anecdote.id !== id ? anecdote : action.data
			);
		case "INIT_ANECDOTES":
			return action.data;
		case "ADD_ANECDOTE":
			return [...state, action.data];
		default:
			return state;
	}
};

export const incrementVoteOf = (votes, content, id) => {
	return async (dispatch) => {
		const changedAnecdote = {
			content,
			id,
			votes: votes + 1,
		};
		const returnedAnecdote = await anecdoteService.update(
			id,
			changedAnecdote
		);
		return dispatch({ type: "VOTE", data: returnedAnecdote });
	};
};

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		return dispatch({ type: "INIT_ANECDOTES", data: anecdotes });
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content);
		return dispatch({ type: "ADD_ANECDOTE", data: newAnecdote });
	};
};

export default anecdoteReducer;
