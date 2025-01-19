import { ApolloClient, InMemoryCache } from "@apollo/client";
import { typePolicies } from "@morpho-org/blue-api-sdk";

const client = new ApolloClient({
  uri: "https://blue-api.morpho.org/graphql",
  cache: new InMemoryCache({ typePolicies }),
});

export const getApolloClient = () => client;
