const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const JWT_SECRET = process.env.SECRET;
const pubsub = new PubSub();

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),

		authorCount: async () => Author.collection.countDocuments(),

		allBooks: async (root, args) => {
			const author = await Author.findOne({ name: args.author });

			if (args.author && !author) {
				throw new UserInputError("Author not found");
			}

			if (args.author && args.genre) {
				return await Book.find({
					author: { $in: [author._id] },
					genres: { $in: [args.genre] },
				}).populate("author");
			} else if (args.author) {
				return await Book.find({
					author: { $in: [author._id] },
				}).populate("author");
			} else if (args.genre) {
				return await Book.find({
					genres: { $in: [args.genre] },
				}).populate("author");
			} else {
				return await Book.find({}).populate("author");
			}

			// PART 8B
			// const filterBooks = books.filter((book) => {
			// if (args.author && args.genre) {
			// 	return (
			// 		book.author === args.author &&
			// 		book.genres.includes(args.genre)
			// 	);
			// }
			// if (args.author) {
			// 	return book.author === args.author;
			// }
			// 	if (args.genre) {
			// 		return book.genres.includes(args.genre);
			// 	}
			// });
			// return filterBooks && books;
		},

		allAuthors: async () => {
			console.log("author.find");
			const authors = await Author.find({}).populate("books");

			authors.forEach(
				(author) => (author.bookCount = author.books.length)
			);
			return authors;

			// PART 8B
			// authors.forEach((author) => {
			// 	author.books = 0;
			// 	books.forEach((book) => {
			// 		if (author.name === book.author) {
			// 			author.books += 1;
			// 		}
			// 	});
			// });
		},

		me: (root, args, { currentUser }) => {
			return currentUser;
		},
	},

	Mutation: {
		addBook: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new AuthenticationError("not authenticated");
			}

			let author = await Author.findOne({ name: args.author });
			let findBook = await Book.findOne({ title: args.title });

			if (!author) {
				author = new Author({ name: args.author });
			}

			const book = new Book({
				...args,
				author,
			});

			try {
				if (!findBook) {
					await book.save();
					author.books = author.books.concat(book);
					await author.save();
				}
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args.title,
				});
			}

			pubsub.publish("BOOK_ADDED", { bookAdded: book });
			return book;
		},

		editAuthor: async (root, args, { currentUser }) => {
			if (!currentUser) {
				throw new AuthenticationError("not authenticated");
			}

			const author = await Author.findOne({ name: args.name });

			if (!author) {
				throw new UserInputError("Author not found", {
					invalidArgs: args.name,
				});
			}
			author.born = !author.born ? args.born : args.born;
			await author.save();
			return author;

			// PART 8B
			// const author = authors.find((author) => author.name === args.name);
			// if (author) {
			// 	updatedAuthor = { ...author, born: args.born };
			// 	authors = authors.map((a) =>
			// 		a.name === args.name ? updatedAuthor : a
			// 	);
			// 	return updatedAuthor;
			// }
		},

		createUser: async (root, args) => {
			const user = new User({
				...args,
			});
			return user.save().catch((error) => {
				throw new UserInputError(error.message, { invalidArgs: args });
			});
		},

		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });
			if (!user || args.password !== "secret") {
				throw new UserInputError("wrong credentials");
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, JWT_SECRET) };
		},
	},

	Subscription: {
		bookAdded: { subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]) },
	},

	// PART 8C
	// Author: {
	// 	bookCount: (root) => {
	// 		console.log('book count')
	// 		return root.books.length;
	// 	},
	// },
};

module.exports = resolvers;
