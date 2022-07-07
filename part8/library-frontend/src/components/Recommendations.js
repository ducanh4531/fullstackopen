import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommendations = (props) => {
	const result = useQuery(ALL_BOOKS);
	const meResult = useQuery(ME);

	if (!props.show) {
		return null;
	}

	if (result.loading) {
		return null;
	}

	return (
		<div>
			<h2>recommendations</h2>
			<p>
				books in your favorite genre{" "}
				<strong>{meResult.data.me.favoriteGenre}</strong>
			</p>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
						<th>genres</th>
					</tr>
					{result.data.allBooks
						.filter((a) =>
							a.genres.includes(meResult.data.me.favoriteGenre)
						)
						.map((a) => (
							<tr key={a.title}>
								<td>{a.title}</td>
								<td>{a.author.name}</td>
								<td>{a.published}</td>
								<td>{a.genres.join(" ")}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default Recommendations;
