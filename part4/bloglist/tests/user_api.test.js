const bcrypt = require("bcrypt");
const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const mongoose = require("mongoose");

describe("when there is initially one user in db", () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash("sam12345", 10);
		const user = new User({ username: "root", name: "Sam", passwordHash });
		await user.save();
	});

	test("succeeds with a valid username and password", async () => {
		const usersAtStart = await helper.userInDb();

		const validUser = {
			username: "ducanh4531",
			name: "Anton",
			password: "sam12345",
		};

		await api
			.post("/api/users")
			.send(validUser)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		const usersAtEnd = await helper.userInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
	});

	test("fails with an invalid username | password - status code 400", async () => {
		const usersAtStart = await helper.userInDb();

		const invalidUser = {
			username: "go",
			name: "DA",
			password: "33333",
		};

		const result = await api
			.post("/api/users")
			.send(invalidUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		expect(result.body.error).toContain("the minimum allowed length (3)");

		const usersAtEnd = await helper.userInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});
});

afterAll(() => mongoose.connection.close());
