import { Address } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { formatFetchBigIntToViewBigInt, ViewBigInt } from "../../../../../shared";
import { config } from "../../../../config/rainbow.config";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { leverageManagerAbi, leverageManagerAddress } from "../../../../generated";
import { queryConfig } from "../../../settings/queryConfig";

export const getLeverageTokenConfigQueryOptions = (leverageToken: Address) => ({
  ...readContractQueryOptions(config, {
    address: leverageManagerAddress,
    abi: leverageManagerAbi,
    functionName: "getLeverageTokenConfig",
    args: [leverageToken],
  }),
  ...queryConfig.infiniteCacheQueryConfig,
});

export interface LeverageTokenConfig {
  rebalanceAdapter: Address;
  lendingAdapter: Address;
  mintTokenFee: ViewBigInt;
  redeemTokenFee: ViewBigInt;
}

export const fetchLeverageTokenConfig = async (leverageToken: Address): Promise<LeverageTokenConfig> => {
  const config = await getQueryClient().fetchQuery({
    ...getLeverageTokenConfigQueryOptions(leverageToken),
  });

  return {
    rebalanceAdapter: config.rebalanceAdapter,
    lendingAdapter: config.lendingAdapter,
    mintTokenFee: formatFetchBigIntToViewBigInt({
      bigIntValue: config.mintTokenFee,
      decimals: 2,
      symbol: "%",
    }),
    redeemTokenFee: formatFetchBigIntToViewBigInt({
      bigIntValue: config.redeemTokenFee,
      decimals: 2,
      symbol: "%",
    }),
  };
};
