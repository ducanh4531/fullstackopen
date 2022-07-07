import axios from "axios";
const baseUrl = "/api/blogs";

var token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const getAll = () => {
	const req = axios.get(baseUrl);
	return req.then((res) => res.data);
};

const create = async (newObject) => {
	const config = { headers: { Authorization: token } };
	const res = await axios.post(baseUrl, newObject, config);
	return res.data;
};

const update = (id, changeObject) => {
	const req = axios.put(`${baseUrl}/${id}`, changeObject);
	return req.then((res) => res.data);
};

const deleteBlog = async (id) => {
	const config = { headers: { Authorization: token } };
	const res = await axios.delete(`${baseUrl}/${id}`, config);
	return res.data;
};

const action = { setToken, getAll, create, update, deleteBlog };

export default action;
