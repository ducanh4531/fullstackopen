import React, { useState } from "react";

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
	];

	const votes = [...anecdotes].fill(0);

	const [selected, setSelected] = useState(0);
	const [list, updateList] = useState(votes);
	// eslint-disable-next-line
	const [vote, setVote] = useState(list[selected]);

	const handleVote = () => {
		list[selected] = list[selected] + 1;
		updateList(list);
		setVote(list[selected]);
	};
	
	const handleSelect = () =>
	setSelected(Math.floor(Math.random() * anecdotes.length));
	
	const bestAnec = anecdotes[list.indexOf(Math.max(...list))];

	return (
		<div>
			<h2>Anecdote of the day</h2>
			<p>{anecdotes[selected]}</p>
			<p>has {list[selected]} votes</p>
			<button onClick={handleVote}>vote</button>
			<button onClick={handleSelect}>next anecdotes</button>
			<h2>Anecdote with most votes</h2>
			<p>{bestAnec}</p>
			<p>has {Math.max(...list)} votes</p>
		</div>
	);
};

export default App;
