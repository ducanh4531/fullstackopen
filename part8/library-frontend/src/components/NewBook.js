import { useState } from "react";
import { useMutation } from "@apollo/client";

import { updateCache } from "../App";
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";

const NewBook = ({ show, setError }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [published, setPublished] = useState("");
	const [genre, setGenre] = useState("");
	const [genres, setGenres] = useState([]);

	const [createBook] = useMutation(ADD_BOOK, {
		onError: (error) => {
			setError(error.graphQLErrors[0].message);
		},
		update: (cache, response) => {
			updateCache(cache, { query: ALL_BOOKS }, response.data.addBook);
			// cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
			// 	return {
			// 		allBooks: allBooks.concat(response.data.addBook),
			// 	};
			// });
		},
		refetchQueries: [{ query: ALL_AUTHORS }],
		// 	refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
	});

	const submit = async (event) => {
		event.preventDefault();

		// if (genres) {
		setGenres(genres.push(genre));
		// }

		await createBook({ variables: { title, author, published, genres } });

		setTitle("");
		setPublished("");
		setAuthor("");
		setGenres([]);
		setGenre("");
	};

	const addGenre = () => {
		setGenres(genres.concat(genre));
		setGenre("");
	};

	if (!show) {
		return null;
	}

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					published
					<input
						type="number"
						value={published}
						onChange={({ target }) =>
							setPublished(Number(target.value))
						}
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type="button">
						add genre
					</button>
				</div>
				<div>genres: {genres.length ? genres.join(" ") : ""}</div>
				<button type="submit">create book</button>
			</form>
		</div>
	);
};

export default NewBook;
