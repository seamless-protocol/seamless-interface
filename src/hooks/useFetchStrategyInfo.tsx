import { useReadContracts } from "wagmi";
import {
  convertRatioToMultiple,
  formatBigIntOnTwoDecimals,
} from "../utils/helpers";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  cbEthAddress,
  loopStrategyAbi,
  loopStrategyAddress,
} from "../generated/generated";
import { ONE_ETHER, ONE_USD } from "../utils/constants";

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
    const targetRatio = BigInt(collateralRatioTargets?.target || 0);
    targetMultiple = convertRatioToMultiple(targetRatio);

    collateralUSD = BigInt(results[1].result || 0);
    const collateralAssetPrice = BigInt(results[4].result || 0);
    collateral = (collateralUSD * ONE_ETHER) / collateralAssetPrice;

    equity = BigInt(results[2].result || 0);
    equityUSD = BigInt(results[3].result || 0);

    currentMultiple = (collateralUSD * ONE_USD) / equityUSD;
  }

  return {
    collateral: formatBigIntOnTwoDecimals(collateral, 18),
    collateralUSD: formatBigIntOnTwoDecimals(collateralUSD, 8),
    equity: formatBigIntOnTwoDecimals(equity, 18),
    equityUSD: formatBigIntOnTwoDecimals(equityUSD, 8),
    currentMultiple: formatBigIntOnTwoDecimals(currentMultiple, 8),
    targetMultiple: formatBigIntOnTwoDecimals(targetMultiple, 8),
  };
};
