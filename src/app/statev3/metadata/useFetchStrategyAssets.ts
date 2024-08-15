import { Address } from "viem";
import { queryContract, queryOptions } from "../../contexts/CustomQueryClientProvider";
import { loopStrategyAbi } from "../../generated";
import { metadataQueryConfig } from "../../state/settings/queryConfig";

export async function fetchStrategyAssets(strategy: Address): Promise<{
  underlying: Address | undefined;
  collateral: Address | undefined;
  debt: Address | undefined;
}> {
  const { underlying, collateral, debt } = await queryContract({
    ...queryOptions({
      address: strategy,
      abi: loopStrategyAbi,
      functionName: "getAssets",
    }),
    ...metadataQueryConfig,
  });

  return {
    underlying,
    collateral,
    debt,
  };
}
