import { useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

export const updateCache = (cache, query, addedBook) => {
	const uniqByTitle = (a) => {
		let seen = new Set();

		return a.filter((item) => {
			let k = item.title;

			return seen.has(k) ? false : seen.add(k);
		});
	};

	cache.updateQuery(query, ({ allBooks }) => {
		return {
			allBooks: uniqByTitle(allBooks.concat(addedBook)),
		};
	});
};

const Notify = ({ errorMessage }) => {
	if (!errorMessage) {
		return null;
	}

	return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [page, setPage] = useState("authors");
	const [token, setToken] = useState(null); //eslint-disable-line
	const client = useApolloClient();

	useSubscription(BOOK_ADDED, {
		onSubscriptionData: async ({ subscriptionData, client }) => {
			const addedBook = subscriptionData.data.bookAdded;
			// window.alert(`${addedBook.title} added`);
			notify(`${addedBook.title} added`);
			updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
		},
	});
	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
		setPage("login");
	};

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => setErrorMessage(null), 10000);
	};

	if (!token) {
		return (
			<>
				<div>
					<button onClick={() => setPage("authors")}>authors</button>
					<button onClick={() => setPage("books")}>books</button>
					<button onClick={() => setPage("login")}>login</button>
				</div>

				<Authors show={page === "authors"} />

				<Books show={page === "books"} />

				<LoginForm
					setToken={setToken}
					show={page === "login"}
					setPage={setPage}
				/>
			</>
		);
	}

	return (
		<>
			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				<button onClick={() => setPage("add")}>add book</button>
				<button onClick={() => setPage("recommend")}>recommend</button>
				<button onClick={logout}>logout</button>
			</div>

			<Notify errorMessage={errorMessage} />
			<Authors show={page === "authors"} />

			<Books show={page === "books"} />

			<NewBook show={page === "add"} setError={notify} />

			<Recommendations show={page === "recommend"} />
		</>
	);
};

export default App;
