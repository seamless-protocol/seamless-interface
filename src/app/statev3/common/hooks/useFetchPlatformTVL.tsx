import { parseUnits } from "viem";
import { formatFetchBigIntToViewBigInt, formatUsdValue, mergeQueryStates } from "@shared";
import { useFetchViewLendingPoolInfo } from "../../../v3/hooks/useFetchViewLendingPoolInfo";
import { USD_VALUE_DECIMALS } from "@meta";
import { useFetchTotalAssetsForWhitelistedVaults } from "@data";

export const useFetchPlatformTVL = () => {
  const {
    data: { totalMarketSizeUsd },
    ...restLandingPool
  } = useFetchViewLendingPoolInfo();
  const { data: morphoVaultsTotalAssets, ...restMorpho } = useFetchTotalAssetsForWhitelistedVaults();

  return {
    ...mergeQueryStates([restLandingPool, restMorpho]),
    TVL:
      totalMarketSizeUsd && morphoVaultsTotalAssets && totalMarketSizeUsd.value
        ? formatFetchBigIntToViewBigInt({
            ...formatUsdValue(
              parseUnits(totalMarketSizeUsd.value, USD_VALUE_DECIMALS) +
                parseUnits(String(morphoVaultsTotalAssets), USD_VALUE_DECIMALS)
            ),
          })
        : undefined,
  };
};
