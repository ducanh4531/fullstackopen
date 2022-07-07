import React from "react";
import ReactDOM from "react-dom";
import {
	ApolloClient,
	ApolloProvider,
	HttpLink,
	InMemoryCache,
	split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

import App from "./App";

const authLink = new setContext((_, { headers }) => {
	const token = localStorage.getItem("user-token");

	return {
		headers: {
			...headers,
			authorization: token ? `bearer ${token}` : null,
		},
	};
});

const wsLink = new WebSocketLink({
	uri: "ws://localhost:4000/graphql",
	options: {
		reconnect: true,
	},
});

const httpLink = new HttpLink({
	uri: "http://localhost:4000",
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	authLink.concat(httpLink)
);

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: splitLink,
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById("root")
);
