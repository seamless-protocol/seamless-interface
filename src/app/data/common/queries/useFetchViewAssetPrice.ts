import { readContractQueryOptions } from "wagmi/query";
import { aaveOracleAbi, aaveOracleAddress, loopStrategyAbi } from "../../../generated";
import { Address, erc20Abi } from "viem";
import { OG_POINTS_ADDRESS, OG_POINTS_MOCK_PRICE, ONE_USD } from "@meta";
import { Config, useConfig } from "wagmi";
import { FetchBigInt } from "../../../../shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Displayable, ViewBigInt } from "../../../../shared";
import { useQuery } from "@tanstack/react-query";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { strategyConfig } from "../../settings/config";
import { assetsConfig } from "../../settings/landingMarketConfig";
import { ONE_MINUTE_IN_MS, ONE_HOUR_IN_MS } from "../../settings/queryConfig";
import { fetchCoinGeckoAssetPriceByAddress } from "../hooks/useFetchCoinGeckoPrice";

export interface AssetPrice {
  price: FetchBigInt;
}
// todo delete this and use AssetPrice.all everywhere.
export const fetchAssetPriceInBlock = async (
  config: Config,
  asset?: Address,
  blockNumber?: bigint,
  underlyingAsset?: Address
): Promise<bigint | undefined> => {
  if (!asset) return undefined;

  if (asset === OG_POINTS_ADDRESS) {
    return OG_POINTS_MOCK_PRICE;
  }

  const queryClient = getQueryClient();

  const strategy = strategyConfig[asset];

  let price = 0n;
  if (strategy) {
    const equityUsd = await queryClient.fetchQuery(
      readContractQueryOptions(config, {
        address: asset,
        abi: loopStrategyAbi,
        functionName: "equityUSD",
        blockNumber,
      })
    );

    const totalSupply = await queryClient.fetchQuery(
      readContractQueryOptions(config, {
        address: asset,
        abi: erc20Abi,
        functionName: "totalSupply",
        blockNumber,
      })
    );

    const decimals = await queryClient.fetchQuery(
      readContractQueryOptions(config, {
        address: asset,
        abi: erc20Abi,
        functionName: "decimals",
      })
    );

    if (totalSupply !== 0n) {
      price = (equityUsd * 10n ** BigInt(decimals)) / totalSupply;
    }
  } else {
    // Cannot fetch past block number prices from CoingGecko
    if (!blockNumber) {
      const config = asset ? assetsConfig[asset] || strategyConfig[asset] : undefined;
      if (config?.useCoinGeckoPrice) {
        return fetchCoinGeckoAssetPriceByAddress({
          address: asset,
          precision: 8,
        });
      }
    }

    price = await queryClient.fetchQuery(
      readContractQueryOptions(config, {
        address: aaveOracleAddress,
        abi: aaveOracleAbi,
        functionName: "getAssetPrice",
        args: [asset],
        blockNumber,
      })
    );
  }

  if (underlyingAsset) {
    const underlyingPrice = await fetchAssetPriceInBlock(config, underlyingAsset, blockNumber);

    if (!underlyingPrice) return undefined;

    price = (price * ONE_USD) / underlyingPrice;
  }

  return price;
};

export const useFetchAssetPriceInBlock = (asset?: Address, blockNumber?: bigint, underlyingAsset?: Address) => {
  const config = useConfig();

  const { data: price, ...rest } = useQuery({
    queryFn: () => fetchAssetPriceInBlock(config, asset, blockNumber, underlyingAsset),
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
