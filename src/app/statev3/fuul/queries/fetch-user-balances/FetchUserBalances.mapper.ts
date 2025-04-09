import { GetUserBalancesQuery, GetUserBalancesQueryVariables } from "../../../../../generated-graphql/subgraph-index";
import { fetchToken, Token, formatFetchBigIntToViewBigInt, ViewBigInt } from "@shared";
import { fetchUserBalances } from "./FetchUserBalances.fetch";

export interface GetUserBalancesQueryExtended {
  userBalances: (GetUserBalancesQuery["userBalances"][number] & {
    currencyToken: Token;
    availableToClaimFormatted: ViewBigInt;
  })[];
}

export async function fetchExtendedUserBalances(
  variables: GetUserBalancesQueryVariables
): Promise<GetUserBalancesQueryExtended> {
  const result = await fetchUserBalances(variables);

  const extendedUserBalances = await Promise.all(
    result.data.userBalances.map(async (userBalance) => {
      const currencyToken = await fetchToken(userBalance.currency);
      const availableToClaimBigInt = BigInt(userBalance.availableToClaim);
      const availableToClaimFormatted = formatFetchBigIntToViewBigInt({
        ...currencyToken,
        bigIntValue: availableToClaimBigInt,
      });

      return {
        ...userBalance,
        currencyToken,
        availableToClaimFormatted,
      };
    })
  );

  return {
    userBalances: extendedUserBalances,
  };
}
