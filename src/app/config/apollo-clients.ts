import { ApolloClient, InMemoryCache } from "@apollo/client";
import { typePolicies } from "@morpho-org/blue-api-sdk";

const morphoApolloClient = new ApolloClient({
  uri: "https://blue-api.morpho.org/graphql",
  cache: new InMemoryCache({ typePolicies }),
});

export const getMorphoApolloClient = () => morphoApolloClient;

const fuulApolloClient = new ApolloClient({
  uri: "https://api.fuul.io/graphql",
  cache: new InMemoryCache(),
});

export const getFuulApolloClient = () => fuulApolloClient;
