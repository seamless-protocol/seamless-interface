import { ilmStrategies } from "../../loop-strategy/config/StrategyConfig";
import { readContract } from "wagmi/actions";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  loopStrategyAbi,
} from "../../../generated";
import { Address, erc20Abi } from "viem";
import { ONE_ETHER, ONE_USD } from "../../../meta";
import { Config, useBlock, useConfig } from "wagmi";
import { FetchBigInt } from "../../../../shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Displayable } from "../../../../shared";
import { ViewAssetPrice } from "../types/ViewAssetPrice";
import { useQuery } from "@tanstack/react-query";
import { metadataQueryConfig } from "../../settings/config";

export interface AssetPrice {
  price: FetchBigInt;
}

const fetchAssetPriceInBlock = async (
  config: Config,
  asset: Address,
  blockNumber?: bigint,
  underlyingAsset?: Address
): Promise<bigint> => {
  const index = ilmStrategies.find((strategy) => strategy.address === asset);

  let price = 0n;
  if (index) {
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
    const underlyingPrice = await fetchAssetPriceInBlock(
      config,
      underlyingAsset,
      blockNumber
    );
    price = (price * ONE_USD) / underlyingPrice;
  }

  return price;
};

export const useFetchAssetPriceInBlock = (
  asset: Address,
  blockNumber: bigint,
  underlyingAsset?: Address
) => {
  const config = useConfig();

  const { data: price, ...rest } = useQuery({
    queryFn: () =>
      fetchAssetPriceInBlock(config, asset, blockNumber, underlyingAsset),
    queryKey: [
      "fetchAssetPriceInBlock",
      asset,
      blockNumber.toString(),
      underlyingAsset,
    ],
    ...metadataQueryConfig,
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

export const useFetchAssetPrice = (
  asset: Address,
  underlyingAsset?: Address
) => {
  const { data: block } = useBlock();
  return useFetchAssetPriceInBlock(asset, block?.number || 0n, underlyingAsset);
};

export const useFetchViewAssetPrice = (
  asset: Address,
  underlyingAsset?: Address
): Displayable<ViewAssetPrice> => {
  const {
    isLoading,
    isFetched,
    data: price,
  } = useFetchAssetPrice(asset, underlyingAsset);

  return {
    isLoading,
    isFetched,
    data: {
      price: formatFetchBigIntToViewBigInt(price),
    },
  };
};
