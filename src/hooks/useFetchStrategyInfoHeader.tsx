import { formatOnTwoDecimals, formatToNumber } from "../utils/helpers";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  cbEthAddress,
  loopStrategyAbi,
  loopStrategyAddress,
} from "../generated";
import { useReadContracts } from "wagmi";

function fetchTargetMultiple(target: bigint | undefined) {
  let targetMultiple;
  if (target) {
    const targetRatio = formatToNumber(target, 8);
    targetMultiple = targetRatio / (targetRatio - 1);
  }

  return targetMultiple;
}

export const useFetchStrategyInfoHeader = () => {
  const { data: results } = useReadContracts({
    contracts: [
      {
        address: loopStrategyAddress,
        abi: loopStrategyAbi,
        functionName: "getCollateralRatioTargets",
      },
      {
        address: aaveOracleAddress,
        abi: aaveOracleAbi,
        functionName: "getAssetPrice",
        args: [cbEthAddress],
      },
    ],
  });

  let targetMultiple, oraclePrice;
  if (results) {
    targetMultiple = fetchTargetMultiple(results[0].result?.target);
    oraclePrice = formatToNumber(results[1].result, 8);
  }

  return {
    targetMultiple: formatOnTwoDecimals(targetMultiple),
    oraclePrice: formatOnTwoDecimals(oraclePrice),
  };
};
