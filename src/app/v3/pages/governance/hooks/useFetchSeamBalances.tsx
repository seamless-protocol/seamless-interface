import { SEAM_ADDRESS, ESSEAM_ADDRESS, STAKED_SEAM_ADDRESS } from "@meta";
import { FetchBigIntStrict, formatFetchBigIntToViewBigInt } from "@shared";
import { useQuery } from "@tanstack/react-query";
import { fetchAssetBalanceUsdValue } from "../../../../statev3/queries/AssetBalanceWithUsdValue/AssetBalanceWithUsdValue.fetch";
import { Address } from "viem";
import { useAccount } from "wagmi";

/**
 * Sums up an array of balance objects, each with token and dollar amounts.
 */
export const cSEAMAssetBalancesUsdValues = (
  ...inputs: { tokenAmount: FetchBigIntStrict; dollarAmount: FetchBigIntStrict }[]
) => {
  return inputs.reduce(
    (acc, curr) => ({
      tokenAmount: acc.tokenAmount + curr.tokenAmount.bigIntValue,
      dollarAmount: acc.dollarAmount + curr.dollarAmount.bigIntValue,
    }),
    { tokenAmount: BigInt(0), dollarAmount: BigInt(0) }
  );
};

/**
 * Fetches balances for the three specific seam tokens.
 * Returns an array where:
 *  - Element 0 is the aggregated sum of token and dollar amounts.
 *  - Element 1 is the balance for SEAM_ADDRESS.
 *  - Element 2 is the balance for ESSEAM_ADDRESS.
 *  - Element 3 is the balance for STAKED_SEAM_ADDRESS.
 */
export const fetchSEAMAssetBalancesUsdValues = async (userAddress: Address) => {
  const [seamBalance, esSeamBalance, stkSeamBalance] = await Promise.all([
    fetchAssetBalanceUsdValue({ asset: SEAM_ADDRESS, userAddress }),
    fetchAssetBalanceUsdValue({ asset: ESSEAM_ADDRESS, userAddress }),
    fetchAssetBalanceUsdValue({ asset: STAKED_SEAM_ADDRESS, userAddress }),
  ]);

  if (!seamBalance || !esSeamBalance || !stkSeamBalance) {
    throw new Error("fetchMultipleAssetBalanceUsdValues: One or more asset balances are undefined");
  }

  const sum = cSEAMAssetBalancesUsdValues(seamBalance, esSeamBalance, stkSeamBalance);

  return {
    seamBalance: {
      tokenAmount: formatFetchBigIntToViewBigInt(seamBalance.tokenAmount),
      dollarAmount: formatFetchBigIntToViewBigInt(seamBalance.dollarAmount),
    },
    esSeamBalance: {
      tokenAmount: formatFetchBigIntToViewBigInt(esSeamBalance.tokenAmount),
      dollarAmount: formatFetchBigIntToViewBigInt(esSeamBalance.dollarAmount),
    },
    stkSeamBalance: {
      tokenAmount: formatFetchBigIntToViewBigInt(stkSeamBalance.tokenAmount),
      dollarAmount: formatFetchBigIntToViewBigInt(stkSeamBalance.dollarAmount),
    },
    sum: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        ...seamBalance.tokenAmount,
        bigIntValue: sum.tokenAmount,
      }),
      dollarAmount: formatFetchBigIntToViewBigInt({
        ...seamBalance.dollarAmount,
        bigIntValue: sum.dollarAmount,
      }),
    },
  };
};

export const hookFetchMultipleAssetBalanceUsdValuesQK = () => [
  "fetchMultipleAssetBalanceUsdValues",
  SEAM_ADDRESS,
  STAKED_SEAM_ADDRESS,
  ESSEAM_ADDRESS,
];

/**
 * Custom hook that uses a single useQuery to fetch all three asset balances.
 *
 * Usage:
 *   const { data: [total, seamBalance, esSeamBalance, stkSeamBalance], ...queryState } =
 *      useFetchMultipleAssetBalanceUsdValues();
 */
export const useFetchMultipleAssetBalanceUsdValues = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: hookFetchMultipleAssetBalanceUsdValuesQK(),
    queryFn: () => fetchSEAMAssetBalancesUsdValues(address!),
    enabled: Boolean(address),
  });
};
