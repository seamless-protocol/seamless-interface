import { getConfig } from "../../../../utils/queryContractUtils";
import { readContractQueryOptions } from "wagmi/query";
import { StakedTokenAbi } from "../../../../../../abis/StakedToken";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { Address } from "viem";
import { queryConfig } from "../../../settings/queryConfig";

export const totalAssetsQueryOptions = (address?: Address) => {
  return readContractQueryOptions(getConfig(), {
    abi: StakedTokenAbi,
    address,
    functionName: "totalAssets",
  });
};

export const fetchTotalAssets = async (address?: Address) => {
  const queryClient = getQueryClient();

  return queryClient.fetchQuery({
    ...totalAssetsQueryOptions(address),
    ...queryConfig.semiSensitiveDataQueryConfig,
  });
};
