import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
	const [name, setName] = useState("anton");
	const [born, setBorn] = useState("");
	const result = useQuery(ALL_AUTHORS);
	const [changeBorn] = useMutation(EDIT_AUTHOR);

	const submit = async (event) => {
		event.preventDefault();
		changeBorn({ variables: { name, born } });

		// setName("");
		setBorn("");
	};

	if (!props.show) {
		return null;
	}

	if (result.loading) {
		return null;
	}

	return (
		<>
			<div>
				<h2>authors</h2>
				<table>
					<tbody>
						<tr>
							<th></th>
							<th>born</th>
							<th>books</th>
						</tr>
						{result.data.allAuthors.map((a) => (
							<tr key={a.name}>
								<td>{a.name}</td>
								<td>{a.born}</td>
								<td>{a.bookCount}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div>
				<h2>Set birthyear</h2>
				<form onSubmit={submit}>
					{/* 8.11 */}
					{/* <div>
						name
						<input
							value={name}
							onChange={({ target }) => setName(target.value)}
						/>
					</div> */}

					{/* 8.12 */}
					<div>
						<select
							value={name}
							onChange={({ target }) => setName(target.value)}
						>
							{result.data.allAuthors.map((a) => (
								<option key={a.name} value={a.name}>
									{a.name}
								</option>
							))}
						</select>
					</div>
					<div>
						born
						<input
							type="number"
							value={born}
							onChange={({ target }) =>
								setBorn(Number(target.value))
							}
						/>
					</div>
					<button type="submit">update author</button>
				</form>
			</div>
		</>
	);
};

export default Authors;
