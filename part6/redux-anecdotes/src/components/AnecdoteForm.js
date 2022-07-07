import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotificationWithTimeout } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
	const addAnecdote = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		props.createAnecdote(content);
		props.showNotificationWithTimeout(`You created '${content}'`, 5000);
	};

	return (
		<>
			<h2>create new</h2>

			<form onSubmit={addAnecdote}>
				<div>
					<input name="anecdote" />
				</div>
				<button>create</button>
			</form>
		</>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		createAnecdote: (value) => dispatch(createAnecdote(value)),
		showNotificationWithTimeout: (value, duration) =>
			dispatch(showNotificationWithTimeout(value, duration)),
	};
};
export default connect(null, mapDispatchToProps)(AnecdoteForm);
