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
        args: [account.address as `0x${string}`],
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
        args: [account.address as `0x${string}`],
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
    targetMultiple,
    userEquity,
    userEquityUSD,
    userBalance,
    userBalanceUSD,
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
        targetMultiple: formatBigIntOnTwoDecimals(targetMultiple, 8) + "x",
        LoopAPY: {
          value: "6.57",
          symbol: "%",
        },
        availableToDeposit: {
          tokenAmount: {
            value: formatBigIntOnTwoDecimals(userBalance, 18),
            symbol: "",
          },
          dollarAmount: {
            value: formatBigIntOnTwoDecimals(userBalanceUSD, 8),
            symbol: "$",
          },
        },
        yourPosition: {
          tokenAmount: {
            value: formatBigIntOnTwoDecimals(userEquity, 18),
            symbol: "",
          },
          dollarAmount: {
            value: formatBigIntOnTwoDecimals(userEquityUSD, 8),
            symbol: "$",
          },
        },
      },
    ],
  };
};
