import { readContractQueryOptions } from "wagmi/query";
import { getConfig } from "../../../../utils/queryContractUtils";
import { ESSEAM_ADDRESS } from "../../../../../meta";
import { EscrowSEAMAbi } from "../../../../../../abis/EscroSEAM";
import { Address } from "viem";
import { queryConfig } from "../../../settings/queryConfig";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { fetchToken, formatFetchBigIntToViewBigInt } from "../../../../../shared";

export const fetchVestedSeamQueryOptions = (userAccount: Address) => {
  return {
    ...readContractQueryOptions(getConfig(), {
      address: ESSEAM_ADDRESS,
      abi: EscrowSEAMAbi,
      functionName: "getClaimableAmount",
      args: [userAccount],
    }),
    ...queryConfig.semiSensitiveDataQueryConfig,
  };
};

export const fetchVestedSeam = async (userAccount: Address) => {
  const queryClient = getQueryClient();

  const [seamRewards, token] = await Promise.all([
    queryClient.fetchQuery(fetchVestedSeamQueryOptions(userAccount)),
    fetchToken(ESSEAM_ADDRESS),
  ]);

  return formatFetchBigIntToViewBigInt({
    bigIntValue: seamRewards,
    decimals: token.decimals,
    symbol: token.symbol,
  });
};
