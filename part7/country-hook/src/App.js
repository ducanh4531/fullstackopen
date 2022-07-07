import { useEffect, useState } from "react";
import axios from "axios";

const useField = (type) => {
	const [value, setValue] = useState("");

	const onChange = (event) => {
		setValue(event.target.value);
	};

	return {
		type,
		value,
		onChange,
	};
};

const useCountry = (name) => {
	const [data, setData] = useState({});

	useEffect(() => {
		if (name) {
			axios
				.get(`https://restcountries.com/v2/name/${name}?fullText=true`)
				.then((res) => setData(res.data[0]));
		}
		setData("empty");
	}, [name]);

	return {
		data,
	};
};

const Country = ({ country }) => {
	if (country.data === "empty") {
		return null;
	}

	if (country.data === undefined) {
		return <div>not found...</div>;
	}
	return (
		<div>
			<h3>{country.data.name} </h3>
			<div>capital {country.data.capital} </div>
			<div>population {country.data.population}</div>
			<img
				src={country.data.flag}
				height="100"
				alt={`flag of ${country.data.name}`}
			/>
		</div>
	);
};

const App = () => {
	const nameInput = useField("text");
	const [name, setName] = useState("");
	const country = useCountry(name);

	const fetch = (e) => {
		e.preventDefault();
		setName(nameInput.value);
	};

	return (
		<div>
			<form onSubmit={fetch}>
				<input {...nameInput} />
				<button>find</button>
			</form>

			<Country country={country} />
		</div>
	);
};

export default App;
