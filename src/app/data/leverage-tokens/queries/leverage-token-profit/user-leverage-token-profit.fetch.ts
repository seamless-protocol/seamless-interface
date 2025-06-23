import {
  UserLeverageTokenProfitDocument,
  UserLeverageTokenProfitQuery,
  UserLeverageTokenProfitQueryVariables,
} from "../../../../../generated-graphql/leverage-token-index";
import { getLeverageTokenApolloClient } from "../../../../config/apollo-clients";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";
import { checkGraphQlResponse } from "../../../../v3/utils/utils";

export const fetchUserLeverageTokenProfitQueryOptions = (variables: { userId: string; leverageTokenId: string }) => ({
  queryKey: ["fetchUserLeverageTokenProfit", variables.userId, variables.leverageTokenId],
  queryFn: async () => {
    const client = getLeverageTokenApolloClient();
    const result = await client.query<UserLeverageTokenProfitQuery, UserLeverageTokenProfitQueryVariables>({
      query: UserLeverageTokenProfitDocument,
      variables: {
        userId: variables.userId,
        leverageTokenId: variables.leverageTokenId,
      },
      fetchPolicy: "no-cache",
    });

    checkGraphQlResponse(result);
    return result.data;
  },
  ...queryConfig.platformDataQueryConfig,
});

export async function fetchUserLeverageTokenProfit(variables: { userId: string; leverageTokenId: string }) {
  const queryClient = getQueryClient();
  const data = await queryClient.fetchQuery(fetchUserLeverageTokenProfitQueryOptions(variables));
  return data;
}
