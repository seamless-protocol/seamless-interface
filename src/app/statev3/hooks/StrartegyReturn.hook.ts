import { Address, parseUnits } from "viem";
import { getBlock } from "wagmi/actions";
import { getConfig } from "../../utils/queryContractUtils";
import { fetchAssetPriceInBlock } from "../queries/AssetPrice.hook";
import { APY_BLOCK_FRAME, PERCENTAGE_VALUE_DECIMALS, USD_VALUE_DECIMALS } from "../../../meta";
import { fetchStrategyAssets } from "../metadata/StrategyAssets.fetch";
import { FetchBigIntStrict, formatFetchBigInt } from "../../../shared";

interface cStrategyReturnInput {
  currStrategyPrice: bigint;
  prevStrategyPrice: bigint;
  currDebtAssetPrice: bigint;
  prevDebtAssetPrice: bigint;
}

export function cStrategyReturn(input: cStrategyReturnInput): FetchBigIntStrict {
  const { currStrategyPrice, prevStrategyPrice, currDebtAssetPrice, prevDebtAssetPrice } = input;

  const currStrategyPriceInDebAsset = (currStrategyPrice * parseUnits("1", USD_VALUE_DECIMALS)) / currDebtAssetPrice;
  const prevStrategyPriceInDebAsset = (prevStrategyPrice * parseUnits("1", USD_VALUE_DECIMALS)) / prevDebtAssetPrice;

  const strategyReturn =
    ((currStrategyPriceInDebAsset - prevStrategyPriceInDebAsset) * parseUnits("1", PERCENTAGE_VALUE_DECIMALS)) /
    prevStrategyPriceInDebAsset;

  return formatFetchBigInt(strategyReturn, PERCENTAGE_VALUE_DECIMALS, "%");
}

export async function fetchStrategyHistoricReturn(strategy: Address) {
  const [{ debt: debtAsset }, latestBlock] = await Promise.all([fetchStrategyAssets(strategy), getBlock(getConfig())]);

  const [currStrategyPrice, prevStrategyPrice, currDebtAssetPrice, prevDebtAssetPrice] = await Promise.all([
    fetchAssetPriceInBlock(strategy, latestBlock.number),
    fetchAssetPriceInBlock(strategy, latestBlock.number - APY_BLOCK_FRAME),
    fetchAssetPriceInBlock(debtAsset, latestBlock.number),
    fetchAssetPriceInBlock(debtAsset, latestBlock.number - APY_BLOCK_FRAME),
  ]);

  return cStrategyReturn({
    currStrategyPrice: currStrategyPrice.bigIntValue,
    prevStrategyPrice: prevStrategyPrice.bigIntValue,
    currDebtAssetPrice: currDebtAssetPrice.bigIntValue,
    prevDebtAssetPrice: prevDebtAssetPrice.bigIntValue,
  });
}
