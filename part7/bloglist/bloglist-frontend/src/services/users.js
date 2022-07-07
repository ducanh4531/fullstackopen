import axios from "axios";
const baseUrl = "http://localhost:3000/api/users";

const getAll = () => {
	const req = axios.get(baseUrl);
	return req.then((res) => res.data);
};

const action = { getAll };

export default action;
