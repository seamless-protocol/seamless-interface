import {
  formatFetchBigIntToViewBigInt,
  Displayable,
  FetchBigIntStrict,
  formatUsdValue,
  ViewBigInt,
  FormattingOptions,
  fetchToken,
} from "@shared";
import { Address, parseUnits, erc4626Abi } from "viem";
import { OG_POINTS_ADDRESS, OG_POINTS_MOCK_PRICE } from "@meta";
import { assetsConfig } from "../settings/landingMarketConfig";
import { aaveOracleAbi, aaveOracleAddress } from "../../generated";
import { getConfig, queryContract } from "../../utils/queryContractUtils";
import { fetchAssetTotalSupplyInBlock } from "./AssetTotalSupply.hook";
import { fetchEquityInBlock } from "./Equity.hook";
import { useQuery } from "@tanstack/react-query";
import { disableCacheQueryConfig, infiniteCacheQueryConfig, platformDataQueryConfig } from "../settings/queryConfig";
import { readContractQueryOptions } from "wagmi/query";
import { checkIfContractExists } from "../../utils/wagmiUtils";
import { strategyConfig } from "../settings/config";
import { fetchCoinGeckoAssetPriceByAddress } from "../common/hooks/useFetchCoinGeckoPrice";

export const fetchAssetPriceInBlock = async (asset: Address, blockNumber?: bigint): Promise<FetchBigIntStrict> => {
  if (asset === OG_POINTS_ADDRESS) {
    return formatUsdValue(OG_POINTS_MOCK_PRICE);
  }

  const strategy = strategyConfig[asset];

  if (strategy) {
    const exists = await checkIfContractExists(asset, blockNumber);
    if (!exists) throw new Error("Insufficient historical data 😖");

    const [{ dollarAmount: equityUsd }, totalSupply] = await Promise.all([
      fetchEquityInBlock({ strategy: asset, blockNumber }),
      fetchAssetTotalSupplyInBlock({ asset, blockNumber }),
    ]);

    if (totalSupply.bigIntValue === 0n) return formatUsdValue(0n);

    return formatUsdValue((equityUsd.bigIntValue * parseUnits("1", totalSupply.decimals)) / totalSupply.bigIntValue);
  }

  const cacheConfig = blockNumber ? infiniteCacheQueryConfig : platformDataQueryConfig;

  try {
    const { decimals: vaultDecimals } = await fetchToken(asset);

    const [vaultSharePrice, vaultAsset] = await Promise.all([
      queryContract({
        ...readContractQueryOptions(getConfig(), {
          address: asset,
          abi: erc4626Abi,
          functionName: "convertToAssets",
          args: [parseUnits("1", vaultDecimals)],
          blockNumber,
        }),
        ...cacheConfig,
      }),
      queryContract({
        ...readContractQueryOptions(getConfig(), {
          address: asset,
          abi: erc4626Abi,
          functionName: "asset",
          blockNumber,
        }),
        ...cacheConfig,
      }),
    ]);

    const { decimals: erc4646AssetDecimals } = await fetchToken(vaultAsset);

    const { bigIntValue: usdAssetPrice } = await fetchAssetPriceInBlock(vaultAsset, blockNumber);

    return formatUsdValue((vaultSharePrice * usdAssetPrice) / parseUnits("1", erc4646AssetDecimals));
  } catch (e) {
    console.debug("is likely not ERC4626");
  }

  const config = assetsConfig[asset] || strategyConfig[asset];

  if (!blockNumber && config?.useCoinGeckoPrice) {
    return formatUsdValue(
      await fetchCoinGeckoAssetPriceByAddress({
        address: asset,
        precision: 8,
      })
    );
  }

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

export const useFetchFormattedAssetPrice = (
  asset?: Address,
  blockNumber?: bigint,
  options?: FormattingOptions
): Displayable<ViewBigInt> => {
  const { data: price, ...rest } = useQuery({
    queryKey: ["hookFormattedAssetPrice", asset, blockNumber],
    queryFn: () => fetchAssetPriceInBlock(asset!, blockNumber),
    enabled: !!asset,
    ...disableCacheQueryConfig,
  });

  return {
    ...rest,
    data: formatFetchBigIntToViewBigInt(price, undefined, options),
  };
};
