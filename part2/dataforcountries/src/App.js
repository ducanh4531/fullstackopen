import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [filterName, setFilterName] = useState("");

	// const [filterCountry, setFilterCountry] = useState([]);
	// const countryLanguages = countries.filter((country) =>
	// country.name.common.toLowerCase().includes(filterName.toLowerCase())
	// );
	// setFilterCountry(countryLanguages);

	//eslint-disable-next-line
	const [capital, setCapital] = useState("");

	// IMPORTANT
	// const [weather, setWeather] = useState(null);

	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			setCountries(response.data);
		});
	}, []);

	// IMPORTANT
	// useEffect(() => {
	// 	const baseUrl = "http://api.weatherstack.com/current";
	// 	const api_key = process.env.REACT_APP_API_KEY;
	// 	const params = {
	// 		access_key: api_key,
	// 		query: capital,
	// 	};
	// 	axios
	// 		.get(baseUrl, { params })
	// 		.then((response) => {
	// 			const weatherCurrent = response.data.current;
	// 			setWeather(weatherCurrent);
	// 		})
	// 		.catch((error) => console.log(error));
	// }, [capital]);

	const handleFilter = (event) => {
		setFilterName(event.target.value);

		if (filterNames.length === 1) {
			const name = filterNames.join('');
			console.log(name);
			setCapital(
				countries
					.filter((country) => {
						return country.name.common
							.toLowerCase()
							.includes(filterName.toLowerCase());
					})
					.map((country) => {
						console.log(country.capital);
						return country.capital;
					})
			);
		}
	};

	// Convert to Country names array to find unique country based on filterName state
	const countryNames = countries.map((country) => country.name.common);
	const filterNames = countryNames.filter((name) =>
		name.toLowerCase().includes(filterName.toLowerCase())
	);
	console.log(filterNames);

	return (
		<div className="App">
			find countries <input onChange={handleFilter} value={filterName} />
			{!filterName && <></>}
			{filterName && filterNames.length > 10 && (
				<p>Too many matches, specify another filter</p>
			)}
			{filterNames.length === 1 && (
				<div>
					<h1>{filterNames}</h1>
					{countries
						.filter((country) => {
							return (
								filterNames.join("").toLowerCase() ===
								country.name.common.toLowerCase()
							);
							// return country.name.common
							// 	.toLowerCase()
							// 	.includes(filterName.toLowerCase());
						})
						.map((country) => {
							return (
								<div key={country}>
									<p>capital {country.capital}</p>
									<p>population {country.population}</p>
									<h2>Spoken languages</h2>
									<ul>
										{Object.values(country.languages).map(
											(languageItem) => (
												<li key={languageItem}>
													{languageItem}
												</li>
											)
										)}
									</ul>
									<img
										border={"1px solid #000"}
										src={country.flags.png}
										alt={country.name.common}
										width={"170"}
										height={"120"}
									/>
									<h2>Weather in {country.capital}</h2>

									{/* IMPORTANT */}
									{/* <p>
										<strong>temperature: </strong>{" "}
										{weather.temperature} Celcius
									</p>
									<img
										src={`https://assets.weatherstack.com/images/wsymbols01_png_64/${weather.weather_icons[0].slice(
											weather.weather_icons[0]
												.join("")
												.indexOf("images/") +
												"images/".length
										)}.png`}
										alt={weather.weather_descriptions[0]}
										border={"1px solid #000"}
										width={"170"}
										height={"120"}
									/>
									<p>
										<strong>wind: </strong>
										{weather.wind_speed} mph direction{" "}
										{weather.wind_dir}
									</p> */}
								</div>
							);
						})}
				</div>
			)}
			{filterNames.length !== 1 &&
				filterNames.length <= 10 &&
				filterNames.map((name, i) => (
					<div key={`${name}-${i}`}>
						<p>
							{name}{" "}
							<button
								name={name}
								onClick={() => {
									setFilterName(name);
									setCapital(
										countries
											.filter((country) => {
												return country.name.common
													.toLowerCase()
													.includes(name.toLowerCase());
											})
											.map((country) => {
												return country.capital;
											})
									);
								}}
							>
								show
							</button>
						</p>
					</div>
				))}
		</div>
	);
};

export default App;
