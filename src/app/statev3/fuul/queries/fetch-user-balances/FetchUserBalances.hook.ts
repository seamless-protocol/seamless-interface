import { useQuery } from "@tanstack/react-query";
import { fetchUserBalances } from "./FetchUserBalances.fetch";
import { GetUserBalancesQueryVariables } from "../../../../../generated-graphql/subgraph-index";
import { queryConfig } from "../../../settings/queryConfig";
import { FuulQueryKeys } from "../../query-keys/FuulQueryKeys";

export const useUserBalances = (variables: GetUserBalancesQueryVariables) => {
  return useQuery({
    queryKey: FuulQueryKeys.userBalancesHook(variables),
    queryFn: () => fetchUserBalances(variables),
    ...queryConfig.semiSensitiveDataQueryConfig,
    enabled: Boolean(variables.owner),
  });
};
