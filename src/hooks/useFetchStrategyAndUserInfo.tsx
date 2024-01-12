import { useAccount, useReadContracts } from "wagmi";
import { formatOnTwoDecimals, formatToNumber } from "../utils/helpers";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  cbEthAbi,
  cbEthAddress,
  loopStrategyAbi,
  loopStrategyAddress,
} from "../generated";

function useFetchStrategyInfoForAccount(account: any) {
  let targetMultiple, userEquity, userEquityUSD, userBalance, userBalanceUSD;
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
        {
          address: cbEthAddress,
          abi: cbEthAbi,
          functionName: "balanceOf",
          args: [account.address],
        },
        {
          address: aaveOracleAddress,
          abi: aaveOracleAbi,
          functionName: "getAssetPrice",
          args: [cbEthAddress],
        },
      ],
    });

    if (results) {
      const collateralRatioTargets = results[0].result;
      const targetRatio = formatToNumber(collateralRatioTargets?.target, 8);
      targetMultiple = targetRatio / (targetRatio - 1);

      const userShares = formatToNumber(results[1].result, 18);
      const totalShares = formatToNumber(results[2].result, 18);

      const equity = formatToNumber(results[3].result, 18);
      const equityUSD = formatToNumber(results[4].result, 8);

      userEquity = equity * (userShares / totalShares);
      userEquityUSD = equityUSD * (userShares / totalShares);

      userBalance = formatToNumber(results[5].result, 18);
      userBalanceUSD = userBalance * formatToNumber(results[6].result, 8);
    }
  }

  return {
    targetMultiple,
    userEquity,
    userEquityUSD,
    userBalance,
    userBalanceUSD,
  };
}

export const useFetchStrategyAndUserInfo = () => {
  const account = useAccount();
  const {
    targetMultiple,
    userEquity,
    userEquityUSD,
    userBalance,
    userBalanceUSD,
  } = useFetchStrategyInfoForAccount(account);

  return {
    targetMultiple: formatOnTwoDecimals(targetMultiple),
    userEquity: formatOnTwoDecimals(userEquity),
    userEquityUSD: formatOnTwoDecimals(userEquityUSD),
    userBalance: formatOnTwoDecimals(userBalance),
    userBalanceUSD: formatOnTwoDecimals(userBalanceUSD),
  };
};
