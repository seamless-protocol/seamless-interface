import { SEAM_ADDRESS, ESSEAM_ADDRESS, STAKED_SEAM_ADDRESS } from "@meta";
import { FetchBigIntStrict, formatFetchBigIntToViewBigInt } from "@shared";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { fetchAssetBalance } from "../../../../data/common/queries/AssetBalance.hook";

/**
 * Sums up an array of balance objects, each with token and dollar amounts.
 */
export const cSEAMAssetBalances = (balance: FetchBigIntStrict[]) => {
  return balance.reduce(
    (acc, curr) => ({
      tokenAmount: acc.tokenAmount + curr.bigIntValue,
    }),
    { tokenAmount: BigInt(0) }
  );
};

/**
 * Fetches balances for the three specific seam tokens.
 * Returns an array where:
 */
export const fetchSEAMAssetBalances = async (account: Address) => {
  const [seamBalance, esSeamBalance, stkSeamBalance] = await Promise.all([
    fetchAssetBalance({ asset: SEAM_ADDRESS, account }),
    fetchAssetBalance({ asset: ESSEAM_ADDRESS, account }),
    fetchAssetBalance({ asset: STAKED_SEAM_ADDRESS, account }),
  ]);

  if (!seamBalance || !esSeamBalance || !stkSeamBalance) {
    throw new Error("fetchMultipleAssetBalanceUsdValues: One or more asset balances are undefined");
  }

  const sum = cSEAMAssetBalances([seamBalance, esSeamBalance, stkSeamBalance]);

  return {
    seamBalance: {
      tokenAmount: formatFetchBigIntToViewBigInt(seamBalance),
    },
    esSeamBalance: {
      tokenAmount: formatFetchBigIntToViewBigInt(esSeamBalance),
    },
    stkSeamBalance: {
      tokenAmount: formatFetchBigIntToViewBigInt(stkSeamBalance),
    },
    sum: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        ...seamBalance,
        bigIntValue: sum.tokenAmount,
      }),
    },
  };
};

export const hookFetchMultipleAssetBalancesQK = () => [
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
export const useFetchSEAMAssetBalances = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: hookFetchMultipleAssetBalancesQK(),
    queryFn: () => fetchSEAMAssetBalances(address!),
    enabled: Boolean(address),
  });
};
