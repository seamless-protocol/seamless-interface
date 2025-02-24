import { Address } from "viem";
import { fetchAssetsCap } from "../AssetsCap/AssetsCap.fetch";
import { fetchEquity } from "../Equity/Equity.fetch";
import { fetchToken } from "../../../../../shared";
import { cRemainingCap, cRemainingCapPercentage } from "./RemainingCap.math";

export async function fetchRemainingCap(address: Address): Promise<{
  remaining?: bigint;
  remainingPercentage?: bigint;
}> {
  const [assetCap, equity, tokenData] = await Promise.all([
    fetchAssetsCap(address),
    fetchEquity(address),
    fetchToken(address),
  ]);
  const { decimals } = tokenData;

  const remaining = cRemainingCap(assetCap, equity);
  const remainingPercentage = cRemainingCapPercentage(assetCap, equity, decimals);

  return {
    remaining,
    remainingPercentage,
  };
}
