import { useSeamlessContractRead } from "../../../../shared";
import {
  incentiveDataProviderAbi,
  incentiveDataProviderAddress,
} from "../../../generated";
import { AAVE_ADDRESS_PROVIDER } from "../../../meta";
import { metadataQueryConfig } from "../../settings/config";

export const useFetchReservesIncentivesData = () => {
  return useSeamlessContractRead({
    address: incentiveDataProviderAddress,
    abi: incentiveDataProviderAbi,
    functionName: "getReservesIncentivesData",
    args: [AAVE_ADDRESS_PROVIDER],
    query: metadataQueryConfig,
  });
};
