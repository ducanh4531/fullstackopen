import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";

const Filter = ({ onChange, value }) => (
	<p>
		filter shown with
		<input onChange={onChange} value={value} />
	</p>
);

const PersonForm = ({ onSubmit, onChange, value }) => (
	<form onSubmit={onSubmit}>
		<div>
			name: <input name="name" onChange={onChange} value={value.name} />
		</div>
		<div>
			number:{" "}
			<input name="phone" onChange={onChange} value={value.phone} />
		</div>
		<div>
			<button type="submit">add</button>
		</div>
	</form>
);

const Person = ({ name, phone, handleDelete }) => (
	<p>
		{name} {phone} <button onClick={handleDelete}>delete</button>
	</p>
);

const App = () => {
	const newInfo = {
		name: "",
		phone: "",
	};

	const [persons, setPersons] = useState([]);
	const [filterName, setFilterName] = useState("");
	const [newValues, setNewValues] = useState(newInfo);
	const [showAll, setShowAll] = useState(true);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			return setPersons(initialPersons);
		});
	}, []);

	const personsToShow = showAll
		? persons
		: persons.filter((person) =>
				person.name.toLowerCase().includes(filterName.toLowerCase())
		  );

	const handleFilter = (event) => {
		setFilterName(event.target.value);

		if (event.target.value === null) {
			return setShowAll(!showAll);
		}

		if (
			persons.filter((person) =>
				person.name.toLowerCase().includes(filterName.toLowerCase())
			)
		) {
			setShowAll(false);
		}
	};

	const addName = (event) => {
		event.preventDefault();

		const nameList = persons.map((item) => item.name);

		if (nameList.includes(newValues.name)) {
			const person = persons.find((n) => n.name === newValues.name);

			const changedPerson = { ...person, phone: newValues.phone };

			window.confirm(
				`${newValues.name} is already added to phonebook, replace the old number with a new one?`
			)
				? personService
						.update(person.id, changedPerson)
						.then((returnedPerson) => {
							setPersons(
								persons.map((person) =>
									person.name === newValues.name
										? returnedPerson
										: person
								)
							);
							setNewValues(newInfo);
						})
						.then(() => {
							setMessage(!message);
							setTimeout(() => setMessage(message), 3000);
						})
				: setNewValues(newInfo);
			return;
		}

		const newPerson = { name: newValues.name, phone: newValues.phone };

		personService.create(newPerson).then((returnedPerson) => {
			setPersons(persons.concat(returnedPerson));
			setNewValues(newInfo);
			setMessage(!message);
			setTimeout(() => setMessage(message), 3000);
		}).catch(err => console.log(err.response.data));
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewValues({ ...newValues, [name]: value });
	};

	const handleDeleteOf = (id) => {
		const person = persons.filter((person) => person.id === id);
		if (window.confirm(`delete ${person[0].name}`)) {
			personService.deletePerson(id).then(() => {
				setPersons(persons.filter((person) => person.id !== id));
			});
		}
	};

	return (
		<div className="App">
			<h2>Phonebook</h2>
			<Notification message={message} name={filterName} />
			<Filter onChange={handleFilter} value={filterName} />
			<h3>Add a new</h3>
			<PersonForm
				onSubmit={addName}
				onChange={handleInputChange}
				value={newValues}
			/>
			<h3>Numbers</h3>
			{personsToShow.map((person) => (
				<Person
					name={person.name}
					phone={person.phone}
					key={`${person.name}${person.id}`}
					handleDelete={() => handleDeleteOf(person.id)}
				/>
			))}
		</div>
	);
};

export default App;
