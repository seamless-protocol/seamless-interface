import { formatFetchBigIntToViewBigInt, Displayable, FetchBigIntStrict, formatUsdValue, ViewBigInt } from "@shared";
import { Address, parseUnits } from "viem";
import { OG_POINTS_ADDRESS, OG_POINTS_MOCK_PRICE } from "@meta";
import { getStrategyBySubStrategyAddress } from "../../state/settings/configUtils";
import { assetsConfig, strategiesConfig } from "../../state/settings/config";
import { fetchCoinGeckoAssetPriceByAddress } from "../../state/common/hooks/useFetchCoinGeckoPrice";
import { aaveOracleAbi, aaveOracleAddress } from "../../generated";
import { queryContract, queryOptions } from "../../utils/queryContractUtils";
import { fetchAssetTotalSupplyInBlock } from "./AssetTotalSupply.hook";
import { fetchEquityInBlock } from "./Equity.hook";
import { useQuery } from "@tanstack/react-query";
import { disableCacheQueryConfig } from "../../state/settings/queryConfig";

export const fetchAssetPriceInBlock = async (asset: Address, blockNumber?: bigint): Promise<FetchBigIntStrict> => {
  if (asset === OG_POINTS_ADDRESS) {
    return formatUsdValue(OG_POINTS_MOCK_PRICE);
  }

  const strategy = getStrategyBySubStrategyAddress(asset);

  if (strategy) {
    const [{ dollarAmount: equityUsd }, totalSupply] = await Promise.all([
      fetchEquityInBlock({ strategy: asset, blockNumber }),
      fetchAssetTotalSupplyInBlock({ asset, blockNumber }),
    ]);

    if (totalSupply.bigIntValue === 0n) return formatUsdValue(0n);

    return formatUsdValue((equityUsd.bigIntValue * parseUnits("1", totalSupply.decimals)) / totalSupply.bigIntValue);
  }

  const config = assetsConfig[asset] || strategiesConfig[asset] || getStrategyBySubStrategyAddress(asset);

  if (!blockNumber && config?.useCoinGeckoPrice) {
    return formatUsdValue(
      await fetchCoinGeckoAssetPriceByAddress({
        address: asset,
        precision: 8,
      })
    );
  }

  return formatUsdValue(
    await queryContract(
      queryOptions({
        address: aaveOracleAddress,
        abi: aaveOracleAbi,
        functionName: "getAssetPrice",
        args: [asset],
        blockNumber,
      })
    )
  );
};

export const useFetchFormattedAssetPrice = (asset?: Address, blockNumber?: bigint): Displayable<ViewBigInt> => {
  const { data: price, ...rest } = useQuery({
    queryKey: ["hookFormattedAssetPrice", asset, blockNumber],
    queryFn: () => fetchAssetPriceInBlock(asset!, blockNumber),
    enabled: !!asset,
    ...disableCacheQueryConfig,
  });

  return {
    ...rest,
    data: formatFetchBigIntToViewBigInt(price),
  };
};
