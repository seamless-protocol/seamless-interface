import { useQuery } from "@tanstack/react-query";
import { Address, parseUnits } from "viem";
import { fetchToken, formatFetchBigIntToViewBigInt } from "../../../../../shared";
import { fetchAssetBalance } from "../../../common/queries/AssetBalance.hook";
import { fetchLeverageTokenAssets } from "../leverage-token-assets/leverage-token-assets.fetch";
import { fetchLeverageTokenByAddress } from "../leverage-token-by-address/FetchLeverageTokenByAddress";

export const fetchMaxLeverageTokenDeposit = async (user: Address, leverageToken: Address) => {
  const leverageTokenAssets = await fetchLeverageTokenAssets(leverageToken);

  const [collateralTokenBalance, collateralTokenData, leverageTokenFullInfo] = await Promise.all([
    fetchAssetBalance({
      account: user,
      asset: leverageTokenAssets.collateralAsset,
    }),
    fetchToken(leverageTokenAssets.collateralAsset),
    fetchLeverageTokenByAddress(leverageToken),
  ]);

  const tvl = leverageTokenFullInfo?.tvl?.tokenAmount.bigIntValue;
  const maxDeposit = leverageTokenFullInfo?.limitsConfig?.maxDeposit;
  const collateralBalance = collateralTokenBalance.bigIntValue;

  let remainingCap;

  if (tvl && maxDeposit && collateralBalance) {
    const maxDepositParsed = parseUnits(maxDeposit.toString(), collateralTokenData.decimals);
    remainingCap = maxDepositParsed > tvl ? maxDepositParsed - tvl : 0n;
    remainingCap = remainingCap > collateralBalance ? collateralBalance : remainingCap;
  }

  return formatFetchBigIntToViewBigInt({
    bigIntValue: remainingCap,
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
