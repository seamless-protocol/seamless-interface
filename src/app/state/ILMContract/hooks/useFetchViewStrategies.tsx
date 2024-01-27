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
  formatToDisplayable,
  formatUnitsToNumber,
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
    targetMultiple: formatUnitsToNumber(targetMultiple, 8),
    userEquity: formatUnitsToNumber(userEquity, 18),
    userEquityUSD: formatUnitsToNumber(userEquityUSD, 8),
    userBalance: formatUnitsToNumber(userBalance, 18),
    userBalanceUSD: formatUnitsToNumber(userBalanceUSD, 8),
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
        targetMultiple: formatToDisplayable(targetMultiple) + "x",
        LoopAPY: {
          value: "6.57",
          symbol: "%",
        },
        availableToDeposit: {
          tokenAmount: {
            value: formatToDisplayable(userBalance),
            symbol: "",
          },
          dollarAmount: {
            value: formatToDisplayable(userBalanceUSD),
            symbol: "$",
          },
        },
        yourPosition: {
          tokenAmount: {
            value: formatToDisplayable(userEquity),
            symbol: "",
          },
          dollarAmount: {
            value: formatToDisplayable(userEquityUSD),
            symbol: "$",
          },
        },
      },
    ],
  };
};
