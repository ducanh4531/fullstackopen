import React, { useState } from "react";

const StatisticLine = ({ text, value }) => {
	return (
		<tbody>
			<tr>
				<td>{text}</td>
				<td>{value}</td>
			</tr>
		</tbody>
	);
};

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Statistic = (props) => {
	console.log(props);
	console.log(props.stats);
	const [good, neutral, bad, allClick, average, positive] = props.stats;

	if (allClick === 0) {
		return <p>No feedback given</p>;
	}

	return (
		<div>
			<table>
				<StatisticLine text={"good"} value={good} />
				<StatisticLine text={"neutral"} value={neutral} />
				<StatisticLine text={"bad"} value={bad} />
				<StatisticLine text={"all"} value={allClick} />
				<StatisticLine text={"average"} value={average} />
				<StatisticLine text={"positive"} value={positive} />
			</table>
		</div>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [allClick, setAll] = useState([]);

	const handleGoodClick = () => {
		setAll(allClick.concat("g"));
		setGood(good + 1);
	};

	const handleNeutralClick = () => {
		setAll(allClick.concat("n"));
		setNeutral(neutral + 1);
	};

	const handleBadClick = () => {
		setAll(allClick.concat("b"));
		setBad(bad + 1);
	};
	const goodScore = allClick.filter((value) => value === "g").length * 1;
	const badScore = allClick.filter((value) => value === "b").length * -1;

	const average =
		allClick.length === 0
			? `${0}`
			: `${((goodScore + badScore) / allClick.length).toFixed(1)}`;

	const positive = !allClick.includes("g")
		? 0
		: `${(
				(allClick.filter((value) => value === "g").length /
					allClick.length) *
				100
		  ).toFixed(1)} %`;

	const dataStats = [good, neutral, bad, allClick.length, average, positive];

	return (
		<div>
			<h2>give feedback</h2>
			<Button onClick={handleGoodClick} text={"good"} />
			<Button onClick={handleNeutralClick} text={"neutral"} />
			<Button onClick={handleBadClick} text={"bad"} />
			<h2>statistics</h2>
			<Statistic stats={dataStats} />
		</div>
	);
};

export default App;
