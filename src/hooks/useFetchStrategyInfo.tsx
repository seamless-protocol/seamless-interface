import { useReadContracts } from "wagmi";
import { formatOnTwoDecimals, formatToNumber } from "../utils/helpers";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  cbEthAddress,
  loopStrategyAbi,
  loopStrategyAddress,
} from "../generated";

export const useFetchStrategyInfo = () => {
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
        functionName: "collateral",
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
        address: aaveOracleAddress,
        abi: aaveOracleAbi,
        functionName: "getAssetPrice",
        args: [cbEthAddress],
      },
    ],
  });

  let collateral,
    collateralUSD,
    equity,
    equityUSD,
    currentMultiple,
    targetMultiple;

  if (results) {
    const collateralRatioTargets = results[0].result;
    const targetRatio = formatToNumber(collateralRatioTargets?.target, 8);
    targetMultiple = targetRatio / (targetRatio - 1);

    collateralUSD = formatToNumber(results[1].result, 8);
    const collateralAssetPrice = formatToNumber(results[4].result, 8);
    collateral = collateralUSD / collateralAssetPrice;

    equity = formatToNumber(results[2].result, 18);
    equityUSD = formatToNumber(results[3].result, 8);

    currentMultiple = collateralUSD / equityUSD;
  }

  return {
    collateral: formatOnTwoDecimals(collateral),
    collateralUSD: formatOnTwoDecimals(collateralUSD),
    equity: formatOnTwoDecimals(equity),
    equityUSD: formatOnTwoDecimals(equityUSD),
    currentMultiple: formatOnTwoDecimals(currentMultiple),
    targetMultiple: formatOnTwoDecimals(targetMultiple),
  };
};
