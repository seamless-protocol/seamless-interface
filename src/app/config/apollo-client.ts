import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://blue-api.morpho.org/graphql",
  cache: new InMemoryCache(),
});

export const getApolloClient = () => client;