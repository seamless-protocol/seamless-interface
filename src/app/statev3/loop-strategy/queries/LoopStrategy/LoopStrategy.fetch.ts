import { Address } from "viem";
import { LoopStrategy } from "../../types/LoopStrategy";
import { fetchAssetsCap } from "../AssetsCap/AssetsCap.fetch";
import { fetchEquity } from "../Equity/Equity.fetch";
import { fetchEquityUsd } from "../Equity/EquityUsd.fetch";
import { fetchRemainingCap } from "../RemainingCap/RemainingCap.fetch";
import { fetchToken } from "@shared";
import { fetchTotalSupply } from "../../../common/queries/TotalSupply/TotalSupply.fetch";

export const fetchLoopStrategy = async (address: Address): Promise<LoopStrategy> => {
  console.log("fetchLoopStrategy fetching...");

  const [assetsCap, equity, equityUsd, tokenData, remainingCap, totalSupply] = await Promise.all([
    fetchAssetsCap(address),
    fetchEquity(address),
    fetchEquityUsd(address),
    fetchToken(address),
    fetchRemainingCap(address),
    fetchTotalSupply(address),
  ]);

  return {
    ...tokenData,
    ...remainingCap,
    assetsCap,
    equity,
    equityUsd,
    totalSupply,
    // todo rest
  };
};
