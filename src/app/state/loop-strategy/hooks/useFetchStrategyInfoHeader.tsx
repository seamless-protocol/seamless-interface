import {
  aaveOracleAbi,
  aaveOracleAddress,
  cbEthAddress,
  loopStrategyAbi,
  loopStrategyAddress,
} from "../../../generated/generated";
import {
  convertRatioToMultiple,
  formatBigIntOnTwoDecimals,
} from "../../../../shared/utils/helpers";
import { useReadContracts } from "wagmi";

export const useFetchStrategyInfoHeader = () => {
  const { data: results, isLoading } = useReadContracts({
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
  const targetMultiple = convertRatioToMultiple(results?.[0].result?.target);

  return {
    isLoading,
    targetMultiple: formatBigIntOnTwoDecimals(targetMultiple, 8),
    oraclePrice: formatBigIntOnTwoDecimals(results?.[1].result, 8),
  };
};
