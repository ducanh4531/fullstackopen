import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementVoteOf } from "../reducers/anecdoteReducer";
import { showNotificationWithTimeout } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<>
			<div>{anecdote.content}</div>
			<div>
				has {anecdote.votes}
				<button onClick={handleClick}>vote</button>
			</div>
		</>
	);
};

const Anecdotes = () => {
	const dispatch = useDispatch();
	const anecdotes = useSelector(({ anecdotes, filter }) => {
		return anecdotes.filter((anecdote) =>
			anecdote.content.toLowerCase().includes(filter.toLowerCase())
		);
	});

	const incrementVote = ({ votes, content, id }) => {
		dispatch(incrementVoteOf(votes, content, id));
		dispatch(showNotificationWithTimeout(`You voted '${content}'`, 5000));
	};

	return (
		<>
			{anecdotes
				.sort((a, b) => b.votes - a.votes)
				.map((anecdote) => (
					<Anecdote
						key={anecdote.id}
						anecdote={anecdote}
						handleClick={() => incrementVote(anecdote)}
					/>
				))}
		</>
	);
};

export default Anecdotes;
