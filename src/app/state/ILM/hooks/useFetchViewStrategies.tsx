import { UseAccountReturnType, useAccount, useReadContracts } from "wagmi";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  cbEthAbi,
  loopStrategyAbi,
} from "../../../generated/generated";
import {
  convertRatioToMultiple,
  formatToDisplayable,
  formatUnitsToNumber,
} from "../../../../shared/utils/helpers";
import { ONE_ETHER } from "../../../meta/constants";
import { Address } from "viem";
import { ilmStrategies } from "../../loop-strategy/config/StrategyConfig";
import { Displayable } from "../../../../shared";
import { ViewStrategy } from "../types/ViewStrategy";

function useFetchStrategyInfoForAccount(
  strategyAddress: Address,
  underlyingAssetAddress: Address,
  account: UseAccountReturnType
) {
  let targetMultiple, userEquity, userEquityUSD, userBalance, userBalanceUSD;
  const {
    data: results,
    isLoading,
    isFetched,
  } = useReadContracts({
    contracts: [
      {
        address: strategyAddress,
        abi: loopStrategyAbi,
        functionName: "getCollateralRatioTargets",
      },
      {
        address: strategyAddress,
        abi: loopStrategyAbi,
        functionName: "balanceOf",
        args: [account.address as Address],
      },
      {
        address: strategyAddress,
        abi: loopStrategyAbi,
        functionName: "totalSupply",
      },
      {
        address: strategyAddress,
        abi: loopStrategyAbi,
        functionName: "equity",
      },
      {
        address: strategyAddress,
        abi: loopStrategyAbi,
        functionName: "equityUSD",
      },
      {
        address: underlyingAssetAddress,
        abi: cbEthAbi,
        functionName: "balanceOf",
        args: [account.address as Address],
      },
      {
        address: aaveOracleAddress,
        abi: aaveOracleAbi,
        functionName: "getAssetPrice",
        args: [underlyingAssetAddress],
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

export const useFetchViewStrategy = (
  index: number
): Displayable<ViewStrategy> => {
  const strategyConfig = ilmStrategies[index];

  const account = useAccount();
  const {
    isLoading,
    isFetched,
    targetMultiple,
    userEquity,
    userEquityUSD,
    userBalance,
    userBalanceUSD,
  } = useFetchStrategyInfoForAccount(
    strategyConfig.address,
    strategyConfig.underlyingAsset.address,
    account
  );

  return {
    isLoading,
    isFetched,
    data: {
      strategyName: strategyConfig.name,
      depositAsset: {
        name: strategyConfig.underlyingAsset.name,
        description: strategyConfig.underlyingAsset.symbol,
        logo: strategyConfig.underlyingAsset.logo,
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
  };
};
