import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { fetchToken, formatFetchBigIntToViewBigInt } from "../../../../../shared";
import { fetchAssetBalance } from "../../../../statev3/queries/AssetBalance.hook";
import { fetchLeverageTokenAssets } from "../leverage-token-assets/leverage-token-assets.fetch";

export const fetchMaxLeverageTokenDeposit = async (user: Address, leverageToken: Address) => {
  const leverageTokenAssets = await fetchLeverageTokenAssets(leverageToken);

  const [collateralTokenBalance, collateralTokenData] = await Promise.all([
    fetchAssetBalance({
      account: user,
      asset: leverageTokenAssets.collateralAsset,
    }),
    fetchToken(leverageTokenAssets.collateralAsset),
  ]);

  return formatFetchBigIntToViewBigInt({
    bigIntValue: collateralTokenBalance.bigIntValue,
    decimals: collateralTokenData.decimals,
    symbol: collateralTokenData.symbol,
  });
};

export const getMaxLeverageTokenDepositQueryOptions = (user?: Address, leverageToken?: Address) => ({
  queryKey: ["useGetMaxLeverageTokenDeposit", user, leverageToken],
  queryFn: () => fetchMaxLeverageTokenDeposit(user!, leverageToken!),
  enabled: !!user && !!leverageToken,
});

export function useFetchMaxLeverageTokenDeposit(user?: Address, leverageToken?: Address) {
  return useQuery(getMaxLeverageTokenDepositQueryOptions(user, leverageToken));
}
