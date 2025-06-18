import { parseUnits } from "viem";
import { formatFetchBigIntToViewBigInt, formatUsdValue, mergeQueryStates } from "@shared";
import { useFetchViewLendingPoolInfo } from "../../../v3/hooks/useFetchViewLendingPoolInfo";
import { useFetchTotalAssetsForWhitelistedVaults } from "../../../v3/pages/morpho-vault-details/hooks/TotalAssetsHistorical.hook";
import { USD_VALUE_DECIMALS } from "@meta";
import { fetchLeverageTokens } from "../../../data/leverage-tokens/queries/all-leverage-tokens/fetch-leverage-tokens.all";
import { fetchLeverageTokenCollateral } from "../../../data/leverage-tokens/queries/collateral/collateral.fetch";
import { useQuery } from "@tanstack/react-query";

export const fetchTotalLeverageTokenCollateral = async () => {
  const leverageTokens = await fetchLeverageTokens();

  let collateralUsdValue: bigint = 0n;

  await Promise.all(
    leverageTokens.map(async (leverageToken) => {
      const collateral = await fetchLeverageTokenCollateral(leverageToken.address);

      if (collateral.dollarAmount.bigIntValue) {
        collateralUsdValue += collateral.dollarAmount.bigIntValue;
      }
    })
  );

  return formatUsdValue(collateralUsdValue);
};

export const getTotalLeverageTokenCollateralQueryOptions = () => ({
  queryKey: ["useGetTotalLeverageTokenCollateral"],
  queryFn: () => fetchTotalLeverageTokenCollateral(),
});

export const useFetchTotalLeverageTokenCollateral = () => {
  return useQuery(getTotalLeverageTokenCollateralQueryOptions());
};

export const useFetchPlatformTVL = () => {
  const {
    data: { totalMarketSizeUsd },
    ...restLandingPool
  } = useFetchViewLendingPoolInfo();
  const { data: morphoVaultsTotalAssets, ...restMorpho } = useFetchTotalAssetsForWhitelistedVaults();

  const { data: leverageTokenCollateral, ...restLeverageTokenCollateral } = useFetchTotalLeverageTokenCollateral();

  return {
    ...mergeQueryStates([restLandingPool, restMorpho, restLeverageTokenCollateral]),
    TVL:
      totalMarketSizeUsd && morphoVaultsTotalAssets && totalMarketSizeUsd.value && leverageTokenCollateral?.bigIntValue
        ? formatFetchBigIntToViewBigInt({
            ...formatUsdValue(
              parseUnits(totalMarketSizeUsd.value, USD_VALUE_DECIMALS) +
                parseUnits(String(morphoVaultsTotalAssets), USD_VALUE_DECIMALS) +
                leverageTokenCollateral.bigIntValue
            ),
          })
        : undefined,
  };
};
