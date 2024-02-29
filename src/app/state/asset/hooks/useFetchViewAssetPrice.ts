import { useEffect, useState } from "react";
import { ilmStrategies } from "../../loop-strategy/config/StrategyConfig";
import { readContract } from "viem/actions";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  loopStrategyAbi,
} from "../../../generated";
import { Address, Client, erc20Abi } from "viem";
import { ONE_ETHER } from "../../../meta";
import { useBlock, useConfig } from "wagmi";
import { Fetch, FetchBigInt } from "../../../../shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Displayable } from "../../../../shared";
import { ViewAssetPrice } from "../types/ViewAssetPrice";

export interface AssetPrice {
  price: FetchBigInt;
}

const fetchAssetPriceInBlock = async (
  client: Client,
  asset: Address,
  blockNumber?: bigint
): Promise<bigint> => {
  const index = ilmStrategies.find((strategy) => strategy.address === asset);

  let price = 0n;
  if (!!index) {
    const equityUsd = await readContract(client, {
      address: asset,
      abi: loopStrategyAbi,
      functionName: "equityUSD",
      blockNumber,
    });
    const totalSupply = await readContract(client, {
      address: asset,
      abi: erc20Abi,
      functionName: "totalSupply",
      blockNumber,
    });

    if (totalSupply !== 0n) {
      price = (equityUsd * ONE_ETHER) / totalSupply;
    }
  } else {
    price = await readContract(client, {
      address: aaveOracleAddress,
      abi: aaveOracleAbi,
      functionName: "getAssetPrice",
      args: [asset],
      blockNumber,
    });
  }

  return price;
};

export const useFetchAssetPriceInBlock = (
  asset: Address,
  blockNumber: bigint
): Fetch<AssetPrice> => {
  const config = useConfig();
  const [price, setPrice] = useState<bigint | undefined>(undefined);

  useEffect(() => {
    fetchAssetPriceInBlock(config.getClient(), asset, blockNumber).then(
      (price) => setPrice(price)
    );
  }, [asset]);

  return {
    isLoading: price === undefined,
    isFetched: price !== 0n,
    price: {
      bigIntValue: price || 0n,
      decimals: 8,
      symbol: "$",
    },
  };
};

export const useFetchAssetPrice = (asset: Address): Fetch<AssetPrice> => {
  const { data: block } = useBlock();
  return useFetchAssetPriceInBlock(asset, block?.number || 0n);
};

export const useFetchViewAssetPrice = (
  asset: Address
): Displayable<ViewAssetPrice> => {
  const { isLoading, isFetched, price } = useFetchAssetPrice(asset);

  return {
    isLoading,
    isFetched,
    data: {
      price: formatFetchBigIntToViewBigInt(price),
    },
  };
};
