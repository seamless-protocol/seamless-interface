import { readContractQueryOptions } from "wagmi/query";
import { loopStrategyAbi } from "../../../generated";
import { Address, erc20Abi } from "viem";
import { OG_POINTS, OG_POINTS_MOCK_PRICE, ONE_ETHER, ONE_USD } from "@meta";
import { Config, useConfig } from "wagmi";
import { FetchBigInt } from "../../../../shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Displayable, ViewBigInt } from "../../../../shared";
import { useQuery } from "@tanstack/react-query";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { ONE_HOUR_IN_MS, ONE_MINUTE_IN_MS } from "../../settings/queryConfig";

export interface AssetPrice {
  price: FetchBigInt;
}

export const fetchAssetPriceInBlock = async (
  config: Config,
  strategy?: Address,
  blockNumber?: bigint,
  underlyingAsset?: Address
): Promise<bigint | undefined> => {
  if (!strategy) return undefined;

  if (strategy === OG_POINTS) {
    return OG_POINTS_MOCK_PRICE;
  }

  const queryClient = getQueryClient();

  let price = 0n;
  const equityUsd = await queryClient.fetchQuery(
    readContractQueryOptions(config, {
      address: strategy,
      abi: loopStrategyAbi,
      functionName: "equityUSD",
      blockNumber,
    })
  );

  const totalSupply = await queryClient.fetchQuery(
    readContractQueryOptions(config, {
      address: strategy,
      abi: erc20Abi,
      functionName: "totalSupply",
      blockNumber,
    })
  );

  if (totalSupply !== 0n) {
    price = (equityUsd * ONE_ETHER) / totalSupply;
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
