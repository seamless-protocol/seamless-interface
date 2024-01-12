import { UseAccountReturnType, useAccount, useReadContracts } from "wagmi";
import { formatBigIntOnTwoDecimals } from "../utils/helpers";
import { loopStrategyAbi, loopStrategyAddress } from "../generated/generated";
import { ONE_USD } from "../utils/constants";

function useFetchStrategyInfoForAccount(account: UseAccountReturnType) {
  let targetMultiple, maxMultiple, userEquity, userEquityUSD;
  if (account && account.address) {
    const { data: results } = useReadContracts({
      contracts: [
        {
          address: loopStrategyAddress,
          abi: loopStrategyAbi,
          functionName: "getCollateralRatioTargets",
        },
        {
          address: loopStrategyAddress,
          abi: loopStrategyAbi,
          functionName: "balanceOf",
          args: [account.address],
        },
        {
          address: loopStrategyAddress,
          abi: loopStrategyAbi,
          functionName: "totalSupply",
        },
        {
          address: loopStrategyAddress,
          abi: loopStrategyAbi,
          functionName: "equity",
        },
        {
          address: loopStrategyAddress,
          abi: loopStrategyAbi,
          functionName: "equityUSD",
        },
      ],
    });

    if (results) {
      const collateralRatioTargets = results[0].result;
      const targetRatio = BigInt(collateralRatioTargets?.target || 0);
      targetMultiple = (targetRatio * ONE_USD) / (targetRatio - ONE_USD);

      const maxRatio = BigInt(collateralRatioTargets?.maxForRebalance || 0);
      maxMultiple = (maxRatio * ONE_USD) / (maxRatio - ONE_USD);

      const userShares = BigInt(results[1].result || 0);
      const totalShares = BigInt(results[2].result || ONE_USD);

      const equity = results[3].result || BigInt(0);
      const equityUSD = results[4].result || BigInt(0);

      userEquity = (equity * userShares) / totalShares;
      userEquityUSD = (equityUSD * userShares) / totalShares;
    }
  }

  return {
    targetMultiple,
    maxMultiple,
    userEquity,
    userEquityUSD,
  };
}

export const useFetchStrategyInfo = () => {
  const account = useAccount();
  const { targetMultiple, maxMultiple, userEquity, userEquityUSD } =
    useFetchStrategyInfoForAccount(account);

  return {
    targetMultiple: formatBigIntOnTwoDecimals(targetMultiple, 8),
    maxMultiple: formatBigIntOnTwoDecimals(maxMultiple, 8),
    userEquity: formatBigIntOnTwoDecimals(userEquity, 18),
    userEquityUSD: formatBigIntOnTwoDecimals(userEquityUSD, 8),
  };
};
