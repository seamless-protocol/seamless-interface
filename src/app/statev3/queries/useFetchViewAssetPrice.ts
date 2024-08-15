import { Address, erc20Abi } from "viem";
import { OG_POINTS, OG_POINTS_MOCK_PRICE, ONE_ETHER, ONE_USD } from "@meta";
import { Displayable, FetchBigInt, ViewBigInt, formatFetchBigIntToViewBigInt } from "../../../shared";
import { getStrategyBySubStrategyAddress } from "../../state/settings/configUtils";
import { queryContract, queryOptions } from "../../contexts/CustomQueryClientProvider";
import { assetsConfig, strategiesConfig } from "../../state/settings/config";
import { fetchCoinGeckoAssetPriceByAddress } from "../../state/common/hooks/useFetchCoinGeckoPrice";
import { useQuery } from "@tanstack/react-query";
import { ONE_HOUR_IN_MS, ONE_MINUTE_IN_MS } from "../../state/settings/queryConfig";
import { aaveOracleAbi, aaveOracleAddress, loopStrategyAbi } from "../../generated";

export interface AssetPrice {
  price: FetchBigInt;
}

export const fetchAssetPriceInBlock = async (
  asset?: Address,
  blockNumber?: bigint,
  underlyingAsset?: Address
): Promise<bigint | undefined> => {
  if (!asset) return undefined;

  if (asset === OG_POINTS) {
    return OG_POINTS_MOCK_PRICE;
  }

  const strategy = getStrategyBySubStrategyAddress(asset);

  let price = 0n;
  if (strategy) {
    const equityUsd = await queryContract(
      queryOptions({
        address: asset,
        abi: loopStrategyAbi,
        functionName: "equityUSD",
        blockNumber,
      })
    );

    const totalSupply = await queryContract(
      queryOptions({
        address: asset,
        abi: erc20Abi,
        functionName: "totalSupply",
        blockNumber,
      })
    );

    if (totalSupply !== 0n) {
      price = (equityUsd * ONE_ETHER) / totalSupply;
    }
  } else {
    // Cannot fetch past block number prices from CoingGecko
    if (!blockNumber) {
      const config = asset
        ? assetsConfig[asset] || strategiesConfig[asset] || getStrategyBySubStrategyAddress(asset)
        : undefined;
      if (config?.useCoinGeckoPrice) {
        return fetchCoinGeckoAssetPriceByAddress({
          address: asset,
          precision: 8,
        });
      }
    }

    price = await queryContract(
      queryOptions({
        address: aaveOracleAddress,
        abi: aaveOracleAbi,
        functionName: "getAssetPrice",
        args: [asset],
        blockNumber,
      })
    );
  }

  if (underlyingAsset) {
    const underlyingPrice = await fetchAssetPriceInBlock(underlyingAsset, blockNumber);

    if (!underlyingPrice) return undefined;

    price = (price * ONE_USD) / underlyingPrice;
  }

  return price;
};

export const useFetchAssetPriceInBlock = (asset?: Address, blockNumber?: bigint, underlyingAsset?: Address) => {
  const { data: price, ...rest } = useQuery({
    queryFn: () => fetchAssetPriceInBlock(asset, blockNumber, underlyingAsset),
    queryKey: ["fetchAssetPriceInBlock", asset, underlyingAsset, { blockNumber: blockNumber?.toString() }],
    staleTime: blockNumber ? ONE_MINUTE_IN_MS : ONE_HOUR_IN_MS,
    enabled: !!asset,
  });

  return {
    ...rest,
    data: {
      bigIntValue: price || 0n,
      decimals: 8,
      symbol: "$",
    },
  };
};

interface useFetchAssetPriceParams {
  asset?: Address;
  underlyingAsset?: Address;
}

export const useFetchAssetPrice = ({ asset, underlyingAsset }: useFetchAssetPriceParams) => {
  return useFetchAssetPriceInBlock(asset, undefined, underlyingAsset);
};

type useFetchViewAssetPriceParams = useFetchAssetPriceParams;

export const useFetchViewAssetPrice = ({
  asset,
  underlyingAsset,
}: useFetchViewAssetPriceParams): Displayable<ViewBigInt> => {
  const { data: price, ...rest } = useFetchAssetPrice({
    asset,
    underlyingAsset,
  });

  return {
    ...rest,
    data: formatFetchBigIntToViewBigInt(price),
  };
};
