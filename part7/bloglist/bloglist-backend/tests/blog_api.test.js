const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const Blog = require("../models/blog");
const helper = require("./test_helper");

// let auth = {};
// let newSavedUser;

// beforeAll(async () => {
// 	await User.deleteMany({});

// 	const getValues = {
// 		username: "root",
// 		password: "sam12345",
// 		name: "Sam",
// 	};

// 	const passwordHash = await bcrypt.hash("sam12345", 10);

// 	const user = new User({
// 		username: getValues.username,
// 		name: getValues.name,
// 		passwordHash,
// 	});

// 	newSavedUser = await user.save();
// });

beforeEach(async () => {
	// const response = await api
	// 	.post("/api/login")
	// 	.send({ username: "root", password: "sam12345" });

	// auth.token = response.body.token;
	// auth.id = jwt.verify(auth.token, process.env.SECRET).id;

	await User.deleteMany({});

	const passwordHash = await bcrypt.hash("sam12345", 10);

	const user = new User({
		username: "root",
		name: "sam",
		passwordHash,
	});

	await user.save();

	await Blog.deleteMany({});

	const blogObjects = helper.initialBlogs.map((blog) => {
		return new Blog({
			...blog,
			user: mongoose.Types.ObjectId(`${user.id}`),
		});
	});

	// const blogObjects = helper.initialBlogs.map((blog) => {
	// 	return new Blog(blog);
	// });

	const promiseArray = blogObjects.map((blog) => blog.save());
	await Promise.all(promiseArray);
});

describe("when there is initially some blogs saved", () => {
	test("all blogs are returned", async () => {
		const response = await api.get("/api/blogs");
		expect(response.body).toHaveLength(helper.initialBlogs.length);
	});

	describe("view a specific blog", () => {
		test("succeeds with a valid id", async () => {
			const blogsAtStart = await helper.blogInDb();
			const blogToView = blogsAtStart[0];

			const resultBlog = await api
				.get(`/api/blogs/${blogToView.id}`)
				.expect(200)
				.expect("Content-Type", /application\/json/);

			const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

			expect(resultBlog.body).toEqual(processedBlogToView);
			expect(resultBlog.body.id).toBeDefined();
		});

		test("fails with a non-exist id - status code 404", async () => {
			const nonExistingId = await helper.nonExistingId();

			await api.get(`/api/blogs/${nonExistingId}`).expect(404);
		});

		test("fails with an invalid id - status code 400", async () => {
			const invalidId = "5a3d5da59070081a82a3445";

			await api.get(`/api/blogs/${invalidId}`).expect(400);
		});
	});

	describe("addition of a new blog", () => {
		test("succeeds with no likes", async () => {
			const usersAtStart = await helper.userInDb();
			const userToView = usersAtStart[0];

			const userForToken = {
				username: userToView.username,
				id: mongoose.Types.ObjectId(`${userToView.id}`),
			};

			const token = jwt.sign(userForToken, process.env.SECRET);

			const decodedToken = jwt.verify(token, process.env.SECRET);

			const newBlog = {
				title: "Fullstack",
				author: "Dan",
				url: "c",
				user: decodedToken.id,
			};

			await api
				.post("/api/blogs")
				.send(newBlog)
				.set("Authorization", `bearer ${token}`)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			const blogsAtEnd = await helper.blogInDb();
			expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

			const titles = blogsAtEnd.map((n) => n.title);
			expect(titles).toContain("Fullstack");

			const likes = blogsAtEnd.map((n) => n.likes);
			expect(likes[likes.length - 1]).toBe(0);
		});

		test("fails with no title and url data - status code 400", async () => {
			const usersAtStart = await helper.userInDb();
			const userToView = usersAtStart[0];
			const userForToken = {
				username: userToView.username,
				id: userToView.id,
			};

			const token = jwt.sign(userForToken, process.env.SECRET);

			const decodedToken = jwt.verify(token, process.env.SECRET);

			const newBlog = {
				author: "Kent",
				likes: 3,
				user: decodedToken.id,
			};

			await api
				.post("/api/blogs")
				.send(newBlog)
				.set("Authorization", `bearer ${token}`)
				.expect(400);

			const blogsAtEnd = await helper.blogInDb();
			expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
		});
	});

	describe("update a blog", () => {
		test("succeeds with a valid id", async () => {
			const blogsAtStart = await helper.blogInDb();
			const blogToUpdate = { ...blogsAtStart[0], likes: 50 };
			await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate);

			const blogsAtEnd = await helper.blogInDb();
			const likes = blogsAtEnd.map((n) => n.likes);
			expect(likes).toContain(50);
		});
	});

	// Incomplete `start`
	describe("deletion of a blog", () => {
		test("1succeeds with a valid user", async () => {
			const blogsAtStart = await helper.blogInDb();
			const blogToDelete = blogsAtStart[0];

			const usersAtStart = await helper.userInDb();
			const userToView = usersAtStart[0];

			const userForToken = {
				username: userToView.username,
				id: mongoose.Types.ObjectId(`${userToView.id}`),
			};

			const token = jwt.sign(userForToken, process.env.SECRET);

			await api
				.delete(`/api/blogs/${blogToDelete.id}`)
				.set("Authorization", `Bearer ${token}`)
				.expect(200);

			const blogsAtEnd = await helper.blogInDb();
			expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

			const titles = blogsAtEnd.map((n) => n.title);
			expect(titles).not.toContain(blogToDelete.title);
		});
		// Incomplete `end`

		test("fails with no token | wrong user - status code 401", async () => {
			const blogsAtStart = await helper.blogInDb();
			const blogToDelete = blogsAtStart[0];

			const token = 0;
			await api
				.delete(`/api/blogs/${blogToDelete.id}`)
				.set("Authorization", `bearer ${token}`)
				.expect(401);

			const blogsAtEnd = await helper.blogInDb();
			expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

			const titles = blogsAtEnd.map((n) => n.title);
			expect(titles).toContain(blogToDelete.title);
		});
	});
});

afterAll(() => {
	mongoose.connection.close();
});
