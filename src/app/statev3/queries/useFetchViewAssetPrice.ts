import { Address, parseUnits } from "viem";
import { OG_POINTS, OG_POINTS_MOCK_PRICE } from "@meta";
import { FetchBigIntStrict, formatUsdValue } from "../../../shared";
import { getStrategyBySubStrategyAddress } from "../../state/settings/configUtils";
import { assetsConfig, strategiesConfig } from "../../state/settings/config";
import { fetchCoinGeckoAssetPriceByAddress } from "../../state/common/hooks/useFetchCoinGeckoPrice";
import { aaveOracleAbi, aaveOracleAddress } from "../../generated";
import { queryContract, queryOptions } from "../../utils/queryContractUtils";
import { fetchDetailEquity } from "./useFetchViewDetailEquity";
import { fetchAssetTotalSupply } from "./useFetchAssetTotalSupply";

export const fetchAssetPriceInBlock = async (asset: Address, blockNumber?: bigint): Promise<FetchBigIntStrict> => {
  if (asset === OG_POINTS) {
    return formatUsdValue(OG_POINTS_MOCK_PRICE);
  }

  const strategy = getStrategyBySubStrategyAddress(asset);

  if (strategy) {
    const [{ dollarAmount: equityUsd }, totalSupply] = await Promise.all([
      fetchDetailEquity(strategy.address),
      fetchAssetTotalSupply({ asset: strategy.address }),
    ]);

    if (totalSupply.bigIntValue === 0n) formatUsdValue(0n);

    return formatUsdValue((equityUsd.bigIntValue * parseUnits("1", totalSupply.decimals)) / totalSupply.bigIntValue);
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
