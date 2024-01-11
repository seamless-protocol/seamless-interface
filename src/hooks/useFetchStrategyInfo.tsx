import { useAccount, useReadContracts } from "wagmi";
import { formatOnTwoDecimals, formatToNumber } from "../utils/helpers";
import { loopStrategyAbi, loopStrategyAddress } from "../generated/generated";

function useFetchStrategyInfoForAccount(account: any) {
  let targetMultiple, maxMultiple, userEquity, userEquityUSD;
  if (account) {
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
      const targetRatio = formatToNumber(collateralRatioTargets?.target, 8);
      targetMultiple = targetRatio / (targetRatio - 1);

      const maxRatio = formatToNumber(
        collateralRatioTargets?.maxForRebalance,
        8
      );
      maxMultiple = maxRatio / (maxRatio - 1);

      const userShares = formatToNumber(results[1].result, 18);
      const totalShares = formatToNumber(results[2].result, 18);

      const equity = formatToNumber(results[3].result, 18);
      const equityUSD = formatToNumber(results[4].result, 8);

      userEquity = equity * (userShares / totalShares);
      userEquityUSD = equityUSD * (userShares / totalShares);
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
    targetMultiple: targetMultiple?.toString(),
    maxMultiple: maxMultiple?.toString(),
    userEquity: formatOnTwoDecimals(userEquity),
    userEquityUSD: formatOnTwoDecimals(userEquityUSD),
  };
};
