const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

//Get user
usersRouter.get("/", async (req, res) => {
	const users = await User.find({}).populate("blogs", {
		title: 1,
		author: 1,
	});
	res.json(users);
});

//Post user
usersRouter.post("/", async (req, res) => {
	const body = req.body;

	if (body.password.length < 3) {
		return res
			.status(400)
			.json({ error: "`password` length should be at least 3" });
	}
	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(body.password, saltRounds);

	const user = new User({
		username: body.username,
		passwordHash,
		name: body.name,
	});

	const savedUser = await user.save();
	res.json(savedUser);
});

module.exports = usersRouter;
