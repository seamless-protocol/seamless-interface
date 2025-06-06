import { ApolloClient, InMemoryCache } from "@apollo/client";
import { typePolicies } from "@morpho-org/blue-api-sdk";

const morphoApolloClient = new ApolloClient({
  uri: "https://blue-api.morpho.org/graphql",
  cache: new InMemoryCache({ typePolicies }),
});

export const getMorphoApolloClient = () => morphoApolloClient;

const fuulApolloClient = new ApolloClient({
  uri: "https://subgraph.satsuma-prod.com/64a0e71a7397/fuul-team--611570/base/api",
  cache: new InMemoryCache(),
});

export const getFuulApolloClient = () => fuulApolloClient;

const leverageApolloClient = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/113147/seamless-leverage-tokens-base/version/latest",
  cache: new InMemoryCache(),
});

export const getLeverageApolloClient = () => leverageApolloClient;
