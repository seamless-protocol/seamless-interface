import { UseAccountReturnType, useAccount, useReadContracts } from "wagmi";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  cbEthAbi,
  cbEthAddress,
  loopStrategyAbi,
  loopStrategyAddress,
} from "../../../../generated/generated";
import {
  convertRatioToMultiple,
  formatBigIntOnTwoDecimals,
} from "../../../../utils/helpers";
import { ONE_ETHER } from "../../../../utils/constants";
import { Address } from "viem";

function useFetchStrategyInfoForAccount(account: UseAccountReturnType) {
  let targetMultiple, userEquity, userEquityUSD, userBalance, userBalanceUSD;
  const {
    data: results,
    isLoading,
    isFetched,
  } = useReadContracts({
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
        args: [account.address as Address],
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
        args: [account.address as Address],
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
    const targetRatio = BigInt(collateralRatioTargets?.target || 0);
    targetMultiple = convertRatioToMultiple(targetRatio);

    const userShares = BigInt(results[1].result || 0);
    const totalShares = BigInt(results[2].result || 0);

    const equity = BigInt(results[3].result || 0);
    const equityUSD = BigInt(results[4].result || 0);

    userEquity = totalShares ? (equity * userShares) / totalShares : 0n;
    userEquityUSD = totalShares ? (equityUSD * userShares) / totalShares : 0n;

    userBalance = BigInt(results[5].result || 0);
    userBalanceUSD = (userBalance * BigInt(results[6].result || 0)) / ONE_ETHER;
  }

  return {
    isLoading,
    isFetched,
    targetMultiple: formatBigIntOnTwoDecimals(targetMultiple, 8),
    userEquity: formatBigIntOnTwoDecimals(userEquity, 18),
    userEquityUSD: formatBigIntOnTwoDecimals(userEquityUSD, 8),
    userBalance: formatBigIntOnTwoDecimals(userBalance, 18),
    userBalanceUSD: formatBigIntOnTwoDecimals(userBalanceUSD, 8),
  };
}

export const useFetchViewStrategies = () => {
  const account = useAccount();
  const {
    isLoading,
    isFetched,
    targetMultiple,
    userEquity,
    userEquityUSD,
    userBalance,
    userBalanceUSD,
  } = useFetchStrategyInfoForAccount(account);

  return {
    isLoading,
    isFetched,
    data: [
      {
        strategyName: "cbETH Booster",
        depositAsset: {
          name: "Coinbase Staked Ether",
          description: "cbETH",
        },
        targetMultiple: targetMultiple + "x",
        LoopAPY: {
          value: "6.57",
          symbol: "%",
        },
        availableToDeposit: {
          tokenAmount: {
            value: userBalance,
            symbol: "",
          },
          dollarAmount: {
            value: userBalanceUSD,
            symbol: "$",
          },
        },
        yourPosition: {
          tokenAmount: {
            value: userEquity,
            symbol: "",
          },
          dollarAmount: {
            value: userEquityUSD,
            symbol: "$",
          },
        },
      },
    ],
  };
};
