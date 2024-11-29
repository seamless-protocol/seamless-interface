import { formatFetchBigIntToViewBigInt, Displayable, FetchBigIntStrict, formatUsdValue, ViewBigInt } from "@shared";
import { Address, parseUnits } from "viem";
import { OG_POINTS_ADDRESS, OG_POINTS_MOCK_PRICE } from "@meta";
import { getStrategyBySubStrategyAddress } from "../../state/settings/configUtils";
import { assetsConfig, strategiesConfig } from "../../state/settings/config";
import { fetchCoinGeckoAssetPriceByAddress } from "../../state/common/hooks/useFetchCoinGeckoPrice";
import { aaveOracleAbi, aaveOracleAddress } from "../../generated";
import { getConfig, queryContract } from "../../utils/queryContractUtils";
import { fetchAssetTotalSupplyInBlock } from "./AssetTotalSupply.hook";
import { fetchEquityInBlock } from "./Equity.hook";
import { useQuery } from "@tanstack/react-query";
import {
  disableCacheQueryConfig,
  infiniteCacheQueryConfig,
  platformDataQueryConfig,
} from "../../state/settings/queryConfig";
import { readContractQueryOptions } from "wagmi/query";

export const fetchAssetPriceInBlock = async (asset: Address, blockNumber?: bigint): Promise<FetchBigIntStrict> => {
  if (asset === OG_POINTS_ADDRESS) {
    return formatUsdValue(OG_POINTS_MOCK_PRICE);
  }

  const strategy = getStrategyBySubStrategyAddress(asset);

  if (strategy) {
    try {
      const [{ dollarAmount: equityUsd }, totalSupply] = await Promise.all([
        fetchEquityInBlock({ strategy: asset, blockNumber }),
        fetchAssetTotalSupplyInBlock({ asset, blockNumber }),
      ]);

      if (totalSupply.bigIntValue === 0n) return formatUsdValue(0n);

      return formatUsdValue((equityUsd.bigIntValue * parseUnits("1", totalSupply.decimals)) / totalSupply.bigIntValue);
    } catch (error) {
      throw new Error("Insufficient historical data 😖");
    }
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

  const cacheConfig = blockNumber ? infiniteCacheQueryConfig : platformDataQueryConfig;

  return formatUsdValue(
    await queryContract({
      ...readContractQueryOptions(getConfig(), {
        address: aaveOracleAddress,
        abi: aaveOracleAbi,
        functionName: "getAssetPrice",
        args: [asset],
        blockNumber,
      }),
      ...cacheConfig,
    })
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

export const useFetchAssetPrice = (asset?: Address, blockNumber?: bigint): Displayable<ViewBigInt> => {
  const { data: price, ...rest } = useQuery({
    queryKey: ["hookFormattedAssetPrice", asset, blockNumber],
    queryFn: () => fetchAssetPriceInBlock(asset!, blockNumber),
    enabled: !!asset,
    ...disableCacheQueryConfig,
  });

  return {
    ...rest,
    data: formatFetchBigIntToViewBigInt(price, undefined, true),
  };
};