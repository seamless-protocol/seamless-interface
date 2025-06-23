import { OG_POINTS_ADDRESS, OG_POINTS_MOCK_PRICE } from "@meta";
import {
  Displayable,
  FetchBigIntStrict,
  fetchToken,
  formatFetchBigIntToViewBigInt,
  FormattingOptions,
  formatUsdValue,
  ViewBigInt,
} from "@shared";
import { useQuery } from "@tanstack/react-query";
import { Address, erc4626Abi, isAddressEqual, parseUnits } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { leverageTokensConfig } from "../../leverage-tokens/queries/all-leverage-tokens/leverageTokens";
/* eslint-disable import/no-cycle */
import { fetchLeverageTokenCollateral } from "../../leverage-tokens/queries/collateral/collateral.fetch";
import { fetchLeverageTokenDebt } from "../../leverage-tokens/queries/debt/debt.fetch";
import { aaveOracleAbi, aaveOracleAddress } from "../../../generated";
import { getConfig, queryContract } from "../../../utils/queryContractUtils";
import { checkIfContractExists } from "../../../utils/wagmiUtils";
import { fetchCoinGeckoAssetPriceByAddress } from "../hooks/useFetchCoinGeckoPrice";
import { configuredVaultAddresses, strategyConfig } from "../../settings/config";
import { assetsConfig } from "../../settings/landingMarketConfig";
import { disableCacheQueryConfig, infiniteCacheQueryConfig, platformDataQueryConfig } from "../../settings/queryConfig";
import { fetchAssetTotalSupplyInBlock } from "./AssetTotalSupply.hook";
import { fetchEquityInBlock } from "../../ilmv1-deprecated/queries/Equity.hook";

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

  const isLeverageToken = leverageTokensConfig.some((leverageToken) => isAddressEqual(leverageToken.address, asset));

  if (isLeverageToken && !blockNumber) {
    const [{ dollarAmount: collateralUsd }, { dollarAmount: debtUsd }, totalSupply, { decimals: assetDecimals }] =
      await Promise.all([
        fetchLeverageTokenCollateral(asset),
        fetchLeverageTokenDebt(asset),
        fetchAssetTotalSupplyInBlock({ asset, blockNumber }),
        fetchToken(asset),
      ]);

    if (!collateralUsd?.bigIntValue || !debtUsd?.bigIntValue) return formatUsdValue(0n);

    const equity = collateralUsd.bigIntValue - debtUsd.bigIntValue;
    const leverageTokenPrice = (equity * parseUnits("1", assetDecimals)) / totalSupply.bigIntValue;

    return formatUsdValue(leverageTokenPrice);
  }

  const cacheConfig = blockNumber ? infiniteCacheQueryConfig : platformDataQueryConfig;

  if (configuredVaultAddresses.find((vaultAddress) => isAddressEqual(vaultAddress, asset))) {
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
