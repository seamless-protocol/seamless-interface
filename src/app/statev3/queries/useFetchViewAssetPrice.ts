import { Address, erc20Abi, parseUnits } from "viem";
import { OG_POINTS, OG_POINTS_MOCK_PRICE, ONE_USD } from "@meta";
import {
  Displayable,
  FetchBigIntStrict,
  ViewBigInt,
  formatFetchBigIntToViewBigInt,
  formatUsdValue,
} from "../../../shared";
import { getStrategyBySubStrategyAddress } from "../../state/settings/configUtils";
import { assetsConfig, strategiesConfig } from "../../state/settings/config";
import { fetchCoinGeckoAssetPriceByAddress } from "../../state/common/hooks/useFetchCoinGeckoPrice";
import { useQuery } from "@tanstack/react-query";
import { ONE_HOUR_IN_MS, ONE_MINUTE_IN_MS } from "../../state/settings/queryConfig";
import { aaveOracleAbi, aaveOracleAddress, loopStrategyAbi } from "../../generated";
import { queryContract, queryOptions } from "../../utils/queryContractUtils";
import { fetchTokenData } from "../metadata/useFetchTokenData";

export const fetchAssetPriceInUsdInBlock = async (asset: Address, blockNumber?: bigint): Promise<FetchBigIntStrict> => {
  if (asset === OG_POINTS) {
    return formatUsdValue(OG_POINTS_MOCK_PRICE);
  }

  const strategy = getStrategyBySubStrategyAddress(asset);

  if (strategy) {
    const [equityUsd, totalSupply, decimals] = await Promise.all([
      queryContract(
        queryOptions({
          address: asset,
          abi: loopStrategyAbi,
          functionName: "equityUSD",
          blockNumber,
        })
      ),
      queryContract(
        queryOptions({
          address: asset,
          abi: erc20Abi,
          functionName: "totalSupply",
          blockNumber,
        })
      ),
      fetchTokenData(asset),
    ]);

    if (totalSupply === 0n) formatUsdValue(0n);

    return formatUsdValue((equityUsd * parseUnits("1", decimals.decimals)) / totalSupply);
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

export const fetchAssetPriceInBlock = async (
  asset: Address,
  blockNumber?: bigint,
  underlyingAsset?: Address
): Promise<FetchBigIntStrict> => {
  const priceInUsd = await fetchAssetPriceInUsdInBlock(asset, blockNumber);

  const underlyingAssetPriceInUsd = underlyingAsset
    ? await fetchAssetPriceInUsdInBlock(underlyingAsset, blockNumber)
    : formatUsdValue(ONE_USD);

  return formatUsdValue((priceInUsd.bigIntValue * ONE_USD) / underlyingAssetPriceInUsd.bigIntValue);
};

export const useFetchAssetPriceInBlock = (asset?: Address, blockNumber?: bigint, underlyingAsset?: Address) => {
  return useQuery({
    queryFn: () => fetchAssetPriceInBlock(asset!, blockNumber, underlyingAsset),
    queryKey: ["fetchAssetPriceInBlock", asset, underlyingAsset, { blockNumber: blockNumber?.toString() }],
    staleTime: blockNumber ? ONE_MINUTE_IN_MS : ONE_HOUR_IN_MS,
    enabled: !!asset,
  });
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
