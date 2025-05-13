import { useQuery } from "@tanstack/react-query";
import { GetUserBalancesQueryVariables } from "../../../../../generated-graphql/subgraph-index";
import { FuulQueryKeys } from "../../query-keys/FuulQueryKeys";
import { fetchExtendedUserBalances } from "./FetchUserBalances.mapper";

export const useFetchUserBalances = (variables: GetUserBalancesQueryVariables) => {
  return useQuery({
    queryKey: FuulQueryKeys.userBalancesHook(variables),
    queryFn: () => fetchExtendedUserBalances(variables),
  });
};
