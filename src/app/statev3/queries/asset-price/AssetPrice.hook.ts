import { formatFetchBigIntToViewBigInt, Displayable, FetchBigIntStrict, formatUsdValue, ViewBigInt } from "@shared";
import { Address, parseUnits } from "viem";
import { OG_POINTS_ADDRESS, OG_POINTS_MOCK_PRICE } from "@meta";
import { aaveOracleAbi, aaveOracleAddress } from "../../../generated";
import { queryContract, queryOptions } from "../../../utils/queryContractUtils";
import { fetchAssetTotalSupplyInBlock } from "../AssetTotalSupply.hook";
import { fetchEquityInBlock } from "../Equity.hook";
import { useQuery } from "@tanstack/react-query";
import {
  disableCacheQueryConfig,
  infiniteCacheQueryConfig,
  platformDataQueryConfig,
} from "../../../state/settings/queryConfig";
import { isAssetStrategy } from "../../settings/configUtils";
import { assetToUseCoinGeckoPriceFor } from "../../settings/config";
import { fetchCoinGeckoAssetPriceByAddress } from "./CoinGeckoPrice.fetch";

const shouldUseCoinGeckoPrice = (address: Address): boolean => assetToUseCoinGeckoPriceFor.includes(address);

export const fetchAssetPriceInBlock = async (asset: Address, blockNumber?: bigint): Promise<FetchBigIntStrict> => {
  if (asset === OG_POINTS_ADDRESS) {
    return formatUsdValue(OG_POINTS_MOCK_PRICE);
  }

  if (isAssetStrategy(asset)) {
    const [{ dollarAmount: equityUsd }, totalSupply] = await Promise.all([
      fetchEquityInBlock({ strategy: asset, blockNumber }),
      fetchAssetTotalSupplyInBlock({ asset, blockNumber }),
    ]);

    if (totalSupply.bigIntValue === 0n) return formatUsdValue(0n);

    return formatUsdValue((equityUsd.bigIntValue * parseUnits("1", totalSupply.decimals)) / totalSupply.bigIntValue);
  }

  if (!blockNumber && shouldUseCoinGeckoPrice(asset)) {
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
      ...queryOptions({
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
