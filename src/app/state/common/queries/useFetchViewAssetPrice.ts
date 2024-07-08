import { readContract } from "wagmi/actions";
import { aaveOracleAbi, aaveOracleAddress, loopStrategyAbi } from "../../../generated";
import { Address, erc20Abi } from "viem";
import { ONE_ETHER, ONE_USD } from "@meta";
import { Config, useConfig } from "wagmi";
import { FetchBigInt } from "../../../../shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Displayable, ViewBigInt } from "../../../../shared";
import { useQuery } from "@tanstack/react-query";
import { useFullTokenData } from "../meta-data-queries/useFullTokenData";
import { useFetchCoinGeckoPricesByAddress } from "../hooks/useFetchCoinGeckoPrice";
import { getStrategyBySubStrategyAddress } from "../../settings/configUtils";
import { ONE_MINUTE_IN_MS } from "../../settings/queryConfig";

export interface AssetPrice {
  price: FetchBigInt;
}

export const fetchAssetPriceInBlock = async (
  config: Config,
  asset?: Address,
  blockNumber?: bigint,
  underlyingAsset?: Address
): Promise<bigint | undefined> => {
  if (!asset) return undefined;

  const strategy = getStrategyBySubStrategyAddress(asset);

  let price = 0n;
  if (strategy) {
    const equityUsd = await readContract(config, {
      address: asset,
      abi: loopStrategyAbi,
      functionName: "equityUSD",
      blockNumber,
    });

    const totalSupply = await readContract(config, {
      address: asset,
      abi: erc20Abi,
      functionName: "totalSupply",
      blockNumber,
    });

    if (totalSupply !== 0n) {
      price = (equityUsd * ONE_ETHER) / totalSupply;
    }
  } else {
    price = await readContract(config, {
      address: aaveOracleAddress,
      abi: aaveOracleAbi,
      functionName: "getAssetPrice",
      args: [asset],
      blockNumber,
    });
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
    staleTime: blockNumber ? ONE_MINUTE_IN_MS : undefined,
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
  const {
    data: { useCoinGeckoPrice },
  } = useFullTokenData(asset);
  const [coingeckoPrice] = useFetchCoinGeckoPricesByAddress(
    useCoinGeckoPrice
      ? [
          {
            address: asset,
            precision: 8,
          },
        ]
      : []
  );

  const assetPriceInBlock = useFetchAssetPriceInBlock(
    useCoinGeckoPrice ? undefined : asset,
    undefined,
    underlyingAsset
  );

  if (useCoinGeckoPrice) {
    const { data: price, ...rest } = coingeckoPrice;

    return {
      ...rest,
      data: {
        bigIntValue: price,
        decimals: 8,
        symbol: "$",
      },
    };
  }

  return assetPriceInBlock;
};

type useFetchViewAssetPriceParams = useFetchAssetPriceParams;

export const useFetchViewAssetPrice = ({
  asset,
  underlyingAsset,
}: useFetchViewAssetPriceParams): Displayable<ViewBigInt> => {
  const { data: price, ...rest } = useFetchAssetPrice({ asset, underlyingAsset });

  return {
    ...rest,
    data: formatFetchBigIntToViewBigInt(price),
  };
};
