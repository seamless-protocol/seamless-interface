import { useEffect, useState } from "react";
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
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Displayable } from "../../../../shared";
import { ViewAssetPrice } from "../types/ViewAssetPrice";

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
  if (!!index) {
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
): FetchData<FetchBigInt> => {
  const config = useConfig();
  const [price, setPrice] = useState<bigint | undefined>(undefined);

  useEffect(() => {
    fetchAssetPriceInBlock(config, asset, blockNumber, underlyingAsset).then(
      (price) => setPrice(price)
    );
  }, [asset, blockNumber]);

  return {
    isLoading: price === undefined,
    isFetched: price !== 0n,
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
): FetchData<FetchBigInt> => {
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
