import { Address, erc4626Abi, zeroAddress } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { getConfig } from "../../../../utils/queryContractUtils";
import { queryConfig } from "../../../settings/queryConfig";
import { fetchToken } from "@shared";

// todo consider creting erc4626 folder for this kind of functions
export const fetchMaxDeposit = async (address: Address, underlyingAddress: Address) => {
  const queryClient = getQueryClient();

  const [maxDeposit, token] = await Promise.all([
    queryClient.fetchQuery({
      ...readContractQueryOptions(getConfig(), {
        address,
        abi: erc4626Abi,
        functionName: "maxDeposit",
        args: [zeroAddress as Address],
      }),
      ...queryConfig.metadataQueryConfig,
    }),
    fetchToken(underlyingAddress),
  ]);

  return {
    decimals: token.decimals,
    symbol: token.symbol,
    bigIntValue: maxDeposit,
  };
};
