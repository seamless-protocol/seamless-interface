import { useSeamlessContractReads } from "./useSeamlessContractReads";
import { formatOnTwoDecimals, formatToNumber } from "../utils/helpers";
import { CBETH_ADDRESS } from "../utils/constants";

interface CollateralRatioTargets {
  target: string;
  maxForRebalance: string;
}

function fetchTargetMultiple(results: any) {
  let targetMultiple;
  if (results) {
    const collateralRatioTargets = results![0]
      .result as unknown as CollateralRatioTargets;
    const targetRatio = formatToNumber(collateralRatioTargets.target, 8);
    targetMultiple = targetRatio / (targetRatio - 1);
  }

  return targetMultiple;
}

export const useFetchStrategyInfoHeader = () => {
  const { data: results } = useSeamlessContractReads([
    {
      contractName: "LoopStrategy",
      functionName: "getCollateralRatioTargets",
      args: [] as never[],
    },
    {
      contractName: "AaveOracle",
      functionName: "getAssetPrice",
      args: [CBETH_ADDRESS] as never[],
    },
  ]);

  const targetMultiple = fetchTargetMultiple(results);
  const oraclePrice = formatToNumber(
    results ? (results![1].result as any as string) : "0",
    8
  );

  return {
    targetMultiple: formatOnTwoDecimals(targetMultiple),
    oraclePrice: formatOnTwoDecimals(oraclePrice),
  };
};
