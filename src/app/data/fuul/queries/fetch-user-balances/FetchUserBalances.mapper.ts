import { GetUserBalancesQuery, GetUserBalancesQueryVariables } from "../../../../../generated-graphql/subgraph-index";
import { fetchToken, Token, formatFetchBigIntToViewBigInt, ViewBigInt } from "@shared";
import { fetchUserBalances } from "./FetchUserBalances.fetch";
import { getConfig } from "../../../../utils/queryContractUtils";
import { fetchAssetPriceInBlock } from "../../../common/queries/useFetchViewAssetPrice";
import { cValueInUsd } from "../../../common/math/cValueInUsd";
import { USD_VALUE_DECIMALS } from "../../../../../meta";

export interface GetUserBalancesQueryExtended {
  userBalances: (GetUserBalancesQuery["userBalances"][number] & {
    currencyToken: Token;
    availableToClaimFormatted: ViewBigInt;
    availableToClaimDollarAmountFormatted: ViewBigInt;
  })[];
}

export async function fetchExtendedUserBalances(
  variables: GetUserBalancesQueryVariables
): Promise<GetUserBalancesQueryExtended> {
  const result = await fetchUserBalances(variables);

  const extendedUserBalances = await Promise.all(
    result.data.userBalances.map(async (userBalance) => {
      const currencyToken = await fetchToken(userBalance.currency);
      const availableToClaimFormatted = formatFetchBigIntToViewBigInt({
        ...currencyToken,
        bigIntValue: userBalance.availableToClaim,
      });

      const tokenPrice = await fetchAssetPriceInBlock(getConfig(), userBalance.currency);
      const dollarValueBigInt = cValueInUsd(BigInt(userBalance.availableToClaim), tokenPrice, currencyToken.decimals);

      return {
        ...userBalance,
        currencyToken,
        availableToClaimFormatted,
        availableToClaimDollarAmountFormatted: formatFetchBigIntToViewBigInt({
          bigIntValue: dollarValueBigInt,
          decimals: USD_VALUE_DECIMALS,
          symbol: "$",
        }),
      };
    })
  );

  return {
    userBalances: extendedUserBalances,
  };
}
