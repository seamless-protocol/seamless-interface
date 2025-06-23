import { readContractQueryOptions } from "wagmi/query";
import { getConfig } from "../../../../utils/queryContractUtils";
import { ESSEAM_ADDRESS, SEAM_ADDRESS, USD_VALUE_DECIMALS } from "../../../../../meta";
import { EscrowSEAMAbi } from "../../../../../../abis/EscrowSEAM";
import { Address } from "viem";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { fetchToken, formatFetchBigIntToViewBigInt } from "../../../../../shared";
import { fetchAssetPriceInBlock } from "../../../common/queries/useFetchViewAssetPrice";
import { cValueInUsd } from "../../../common/math/cValueInUsd";
import { queryConfig } from "../../../settings/queryConfig";

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

  const [vestedSeam, token] = await Promise.all([
    queryClient.fetchQuery(fetchVestedSeamQueryOptions(userAccount)),
    fetchToken(ESSEAM_ADDRESS),
  ]);

  return formatFetchBigIntToViewBigInt({
    bigIntValue: vestedSeam,
    decimals: token.decimals,
    symbol: token.symbol,
  });
};

export const fetchVestedSeamWithDollarAmount = async (userAccount: Address) => {
  const [vestedSeam, vestedSeamPrice] = await Promise.all([
    fetchVestedSeam(userAccount),
    fetchAssetPriceInBlock(getConfig(), SEAM_ADDRESS),
  ]);

  const dollarValue = cValueInUsd(vestedSeam.bigIntValue, vestedSeamPrice, vestedSeam.decimals);

  return {
    tokenAmount: vestedSeam,
    dollarAmount: formatFetchBigIntToViewBigInt({
      bigIntValue: dollarValue,
      decimals: USD_VALUE_DECIMALS,
      symbol: "$",
    }),
  };
};
