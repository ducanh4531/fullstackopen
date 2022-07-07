import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
	const res = await axios.get(baseUrl);
	return res.data;
};

const createNew = async (content) => {
	const object = { content, votes: 0 };
	const res = await axios.post(baseUrl, object);
	return res.data;
};

const update = async (id, changeObject) => {
	const res = await axios.put(`${baseUrl}/${id}`, changeObject);
	return res.data;
};

const action = { getAll, createNew, update };

export default action;
