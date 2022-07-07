const { gql } = require("apollo-server");

const typeDefs = gql`
	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		me: User
	}

	type Mutation {
		addBook(
			title: String!
			published: Int
			author: String!
			genres: [String!]!
		): Book
		editAuthor(name: String!, born: Int!): Author
		createUser(username: String!, favoriteGenre: String!): User
		login(username: String!, password: String!): Token
	}

	type Author {
		id: ID!
		name: String!
		born: Int
		bookCount: Int
		books: [Book!]
	}

	type Book {
		id: ID!
		title: String!
		author: Author!
		published: Int
		genres: [String!]!
	}

	type User {
		id: ID!
		username: String!
		favoriteGenre: String!
	}

	type Token {
		value: String!
	}

	type Subscription {
		bookAdded: Book!
	}
`;

module.exports = typeDefs;
