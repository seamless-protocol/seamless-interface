import { CBETH_ADDRESS } from "../utils/constants";
import { formatOnTwoDecimals, formatToNumber } from "../utils/helpers";
import { useSeamlessContractReads } from "./useSeamlessContractReads";
interface CollateralRatioTargets {
  target: string;
  maxForRebalance: string;
}

export const useFetchStrategyInfo = () => {
  const { data: results } = useSeamlessContractReads([
    {
      contractName: "LoopStrategy",
      functionName: "getCollateralRatioTargets",
      args: [] as never[],
    },
    {
      contractName: "LoopStrategy",
      functionName: "collateral",
      args: [] as never[],
    },
    {
      contractName: "LoopStrategy",
      functionName: "equity",
      args: [] as never[],
    },
    {
      contractName: "LoopStrategy",
      functionName: "equityUSD",
      args: [] as never[],
    },
    {
      contractName: "AaveOracle",
      functionName: "getAssetPrice",
      args: [CBETH_ADDRESS] as never[],
    },
  ]);

  console.log(results);
  let collateral,
    collateralUSD,
    equity,
    equityUSD,
    currentMultiple,
    targetMultiple;

  if (results) {
    const collateralRatioTargets = results![0]
      .result as unknown as CollateralRatioTargets;
    const targetRatio = formatToNumber(collateralRatioTargets.target, 8);
    targetMultiple = targetRatio / (targetRatio - 1);

    collateralUSD = formatToNumber(results![1].result as any as string, 8);
    const collateralAssetPrice = formatToNumber(
      results![4].result as any as string,
      8
    );
    collateral = collateralUSD / collateralAssetPrice;

    equity = formatToNumber(results![2].result as any as string, 18);
    equityUSD = formatToNumber(results![3].result as any as string, 8);

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
