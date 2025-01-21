import { parseUnits } from "viem";
import { formatFetchBigIntToViewBigInt, formatUsdValue, mergeQueryStates } from "@shared";
import { useFetchViewLendingPoolInfo } from "../../../v3/hooks/useFetchViewLendingPoolInfo";
import { useFetchTotalAssetsForWhitelistedVaults } from "../../../v3/pages/morpho-vault-details/hooks/TotalAssetsHistorical.hook";
import { USD_VALUE_DECIMALS } from "@meta";

export const useFetchPlatformTVL = () => {
  const {
    data: { totalMarketSizeUsd },
    ...restLandingPool
  } = useFetchViewLendingPoolInfo();
  const { data: morphoVaultsTotalAssets, ...restMorpho } = useFetchTotalAssetsForWhitelistedVaults();

  return {
    ...mergeQueryStates([restLandingPool, restMorpho]),
    TVL:
      totalMarketSizeUsd && morphoVaultsTotalAssets
        ? formatFetchBigIntToViewBigInt({
            ...formatUsdValue(
              parseUnits(totalMarketSizeUsd.value || "0", USD_VALUE_DECIMALS) +
                parseUnits(morphoVaultsTotalAssets.toString(), USD_VALUE_DECIMALS)
            ),
          })
        : undefined,
  };
};
