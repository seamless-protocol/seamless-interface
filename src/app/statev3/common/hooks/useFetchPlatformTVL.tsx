import { parseUnits } from "viem";
import { formatFetchBigIntToViewBigInt, formatUsdValue, mergeQueryStates } from "@shared";
import { useFetchViewLendingPoolInfo } from "../../../v3/hooks/useFetchViewLendingPoolInfo";
import { useFetchTotalAssetsForWhitelistedVaults } from "../../../v3/pages/morpho-vault-details/hooks/TotalAssetsHistorical.hook";
import { USD_VALUE_DECIMALS } from "@meta";
import { useFetchTotalLeverageTokenEquity } from "../../../data/leverage-tokens/queries/equity/equity.all";

export const useFetchPlatformTVL = () => {
  const {
    data: { totalMarketSizeUsd },
    ...restLandingPool
  } = useFetchViewLendingPoolInfo();
  const { data: morphoVaultsTotalAssets, ...restMorpho } = useFetchTotalAssetsForWhitelistedVaults();

  const { data: leverageTokenEquity, ...restLeverageTokenEquity } = useFetchTotalLeverageTokenEquity();

  return {
    ...mergeQueryStates([restLandingPool, restMorpho, restLeverageTokenEquity]),
    TVL:
      totalMarketSizeUsd && morphoVaultsTotalAssets && totalMarketSizeUsd.value && leverageTokenEquity?.bigIntValue
        ? formatFetchBigIntToViewBigInt({
            ...formatUsdValue(
              parseUnits(totalMarketSizeUsd.value, USD_VALUE_DECIMALS) +
                parseUnits(String(morphoVaultsTotalAssets), USD_VALUE_DECIMALS) +
                leverageTokenEquity.bigIntValue
            ),
          })
        : undefined,
  };
};
