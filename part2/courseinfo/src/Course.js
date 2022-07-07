import React from "react";
import "./App.css";

const Course = ({ course }) => {
	const Header = ({ header }) => {
		return (
			<div>
				{header.map((courseItem) => (
					<div key={courseItem.id}>
						<h2>{courseItem.name}</h2>
						<Content contents={courseItem} />
						<Total total={courseItem} />
					</div>
				))}
			</div>
		);
	};

	const Content = ({ contents }) => {
		return (
			<ul className="listApp">
				{contents.parts.map((partItem) => (
					<Part
						key={partItem.id}
						name={partItem.name}
						exercises={partItem.exercises}
					/>
				))}
			</ul>
		);
	};

	const Part = ({ name, exercises }) => (
		<li>
			{name}: {exercises}
		</li>
	);

	const Total = ({ total }) => {
		return (
			<p>
				<strong>
					Total of{" "}
					{total.parts.reduce(
						(sum, currItem) => sum + currItem.exercises,
						0
					)}{" "}
					exercises
				</strong>
			</p>
		);
	};

	return (
		<div>
			<Header header={course} />
			{/* <Content contents={course} /> */}
			{/* <Total total={course} /> */}
		</div>
	);
};

export default Course;
