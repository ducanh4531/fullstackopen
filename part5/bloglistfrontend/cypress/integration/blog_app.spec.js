describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset");

		const users = [
			{
				username: "s2tomhum",
				password: "sam12345",
				name: "Anton",
			},
			{
				username: "ducanh4531",
				password: "sam12345",
				name: "Sam",
			},
		];

		users.map((user) => {
			cy.request("POST", "http://localhost:3003/api/users", user);
		});

		cy.visit("http://localhost:3000");
	});

	it("Login form is shown", function () {
		cy.contains("username");
		cy.contains("password");
	});

	describe("login", function () {
		it("succeeds with correct credentials", function () {
			cy.login({ username: "ducanh4531", password: "sam12345" });
			cy.contains("Sam logged in");
		});

		it("fails with wrong credentials", function () {
			cy.get("#username").type("ducanh4531");
			cy.get("#password").type("wrong");
			cy.get("#login-button").click();
			cy.get(".error").should("contain", "wrong username or password");
		});
	});

	describe("When logged in", function () {
		beforeEach(function () {
			cy.login({ username: "ducanh4531", password: "sam12345" });
		});

		it("blogs can be created and the one with the most likes will be ordered first", function () {
			const blogs = [
				{
					title: "Javascript5",
					author: "Dan",
					url: "fb.com",
					likes: 5,
				},
				{
					title: "Javascript10",
					author: "Dan",
					url: "fb.com",
					likes: 10,
				},
				{
					title: "Javascript15",
					author: "Dan",
					url: "fb.com",
					likes: 15,
				},
			];

			blogs.map((blog) => cy.createBlog(blog));

			cy.get(".view-btn").click({ multiple: true });

			cy.get(".blog").then((blogs) => {
				let likeArr = [];
				// blogs.map((index) =>
				// 	cy
				// 		.wrap(blogs[index])
				// 		.get(".likeStat")
				// 		.invoke("text")
				// 		.then((text, index) => cy.log(text[index]))
				// );

				cy.wrap(blogs[0])
					.find("span")
					.invoke("text")
					.then((text) => {
						likeArr.push(Number(text));
					});
				cy.wrap(blogs[1])
					.find("span")
					.invoke("text")
					.then((text) => {
						likeArr.push(Number(text));
					});
				cy.wrap(blogs[2])
					.find("span")
					.invoke("text")
					.then((text) => {
						likeArr.push(Number(text));
						cy.wrap(blogs[0])
							.find("span")
							.should("contain", String(Math.max(...likeArr)));
					});
			});
			cy.contains("Javascript");
			cy.contains("Dan");
		});

		describe("a blog exists", function () {
			beforeEach(function () {
				cy.createBlog({
					title: "Javascript",
					author: "Dan",
					url: "fb.com",
				});
			});

			it("like a blog", function () {
				cy.get("#view-button").click();
				cy.contains("likes 0");

				cy.get("#like-button").click();
				cy.contains("likes 1");
			});

			it("remove blog with wrong user", function () {
				cy.contains("logout").click();
				cy.login({ username: "s2tomhum", password: "sam12345" });

				cy.contains("Javascript")
					.get("#view-button")
					.click()
					.should("not.have.value", "remove");
			});

			it("remove blog with valid user", function () {
				cy.contains("Javascript")
					.get("#view-button")
					.click()
					.get("#remove-button")
					.click();
			});
		});
	});
});
