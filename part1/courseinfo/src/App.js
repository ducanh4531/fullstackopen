import React from "react";

const Header = (props) => (
	<header>
		<h1>{props.header.name}</h1>
	</header>
);

const Part = (props) => (
	<div>
		<p>
			{props.part}: {props.exercises}
		</p>
	</div>
);

const Content = (props) => (
	<div>
		<Part
			part={props.content.parts[0].name}
			exercises={props.content.parts[0].exercises}
		/>
		<Part
			part={props.content.parts[1].name}
			exercises={props.content.parts[1].exercises}
		/>
		<Part
			part={props.content.parts[2].name}
			exercises={props.content.parts[2].exercises}
		/>
	</div>
);

const Total = (props) => {
	let total = props.total.parts.reduce(
		(sum, curItem) => sum + curItem.exercises,
		0
	);
	return (
		<div>
			<p>Total exercises are {total}</p>
		</div>
	);
};

const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
			},
			{
				name: "State of a component",
				exercises: 14,
			},
		],
	};

	return (
		<div>
			<Header header={course} />
			<Content content={course} />
			<Total total={course} />
		</div>
	);
};

export default App;
