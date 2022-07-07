import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
	const [genre, setGenre] = useState("");
	const { loading, data } = useQuery(ALL_BOOKS, {
		variables: { genre },
	});
	const genres = useQuery(ALL_BOOKS, {
		pollInterval: 5000,
	});

	if (!props.show) {
		return null;
	}

	if (loading) {
		return null;
	}

	return (
		<div>
			<h2>books</h2>
			<p>
				in genre <strong>{genre ? genre : "all genres"}</strong>
			</p>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
						<th>genres</th>
					</tr>
					{/* 8.19 */}
					{/* {genre === "all genres"
						? result.data.allBooks.map((a) => (
								<tr key={a.title}>
									<td>{a.title}</td>
									<td>{a.author.name}</td>
									<td>{a.published}</td>
									<td>{a.genres.join(" ")}</td>
								</tr>
						  ))
						: result.data.allBooks
								.filter((a) => a.genres.includes(genre))
								.map((a) => (
									<tr key={a.title}>
										<td>{a.title}</td>
										<td>{a.author.name}</td>
										<td>{a.published}</td>
										<td>{a.genres.join(" ")}</td>
									</tr>
								))} */}

					{/* 8.21 */}
					{data.allBooks.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
							<td>{a.genres.join(" ")}</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* CREATE BUTTONS */}
			{genres.data.allBooks
				.map((book) => book.genres)
				.flat()
				.reduce(
					(prev, cur) => (prev.includes(cur) ? prev : [...prev, cur]),
					[]
				)
				.map((genre) => (
					<button
						onClick={() => setGenre(genre)}
						value={genre}
						key={genre}
					>
						{genre}
					</button>
				))}
			<button onClick={() => setGenre("")}>all genres</button>
		</div>
	);
};

export default Books;
