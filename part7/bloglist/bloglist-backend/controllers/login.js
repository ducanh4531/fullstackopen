const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

loginRouter.post("/", async (req, res) => {
	const body = req.body;

	const user = await User.findOne({ username: body.username });

	const passwordCorrect =
		user === null
			? false
			: await bcrypt.compare(body.password, user.passwordHash);

	if (!(passwordCorrect && user)) {
		return res.status(401).json({ error: "invalid username or password" });
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	};

	const token = jwt.sign(userForToken, process.env.SECRET);

	// {
	// 	expiresIn: 24 * 60 * 60,
	// }
	
	res.send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
