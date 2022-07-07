import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

export const User = ({ user }) => {
	if (!user) {
		return null;
	}
	return (
		<>
			<h2>{user.name}</h2>
			<p style={{ fontWeight: "bold" }}>added blogs</p>
			<br />
			<ul>
				{user.blogs.map((blog) => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</>
	);
};
const Users = ({ users }) => {
	return (
		<>
			<h2>Users</h2>
			<Table striped>
				<tbody>
					<tr>
						<td></td>
						<td style={{ fontWeight: "bold" }}>blogs created</td>
					</tr>
					{users.map((user) => (
						<tr key={user.id}>
							<td>
								<Link to={`/users/${user.id}`}>
									{user.name}
								</Link>
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};

User.propTypes = {
	user: PropTypes.object,
};

Users.propTypes = {
	users: PropTypes.array.isRequired,
};

export default Users;
