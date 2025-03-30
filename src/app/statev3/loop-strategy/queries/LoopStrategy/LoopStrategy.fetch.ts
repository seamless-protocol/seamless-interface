import { Address } from "viem";
import { LoopStrategy } from "../../types/LoopStrategy";
import { fetchAssetsCap } from "../AssetsCap/AssetsCap.fetch";
import { fetchEquity } from "../Equity/Equity.fetch";
import { fetchEquityUsd } from "../Equity/EquityUsd.fetch";
import { fetchRemainingCap } from "../RemainingCap/RemainingCap.fetch";
import { fetchToken } from "@shared";
import { fetchTotalSupply } from "../../../common/queries/TotalSupply/TotalSupply.fetch";
import { fetchEquityDependent } from "../Equity/EquityDependent.fetch";

export const fetchLoopStrategy = async (address: Address): Promise<LoopStrategy> => {
  console.log("fetchLoopStrategy fetching...");

  const [assetsCap, equity, equityUsd, tokenData, remainingCap, totalSupply] = await Promise.all([
    fetchAssetsCap(address),
    // mutate equity, EquityUsd
    fetchEquity(address),
    fetchEquityUsd(address),
    fetchToken(address),
    fetchRemainingCap(address),
    fetchTotalSupply(address),
  ]);

  console.log({ equity });
  const [eqDep] = await Promise.all([fetchEquityDependent(address, equity)]);
  console.log({ eqDep });

  return {
    ...tokenData,
    ...remainingCap,
    eqDep,
    assetsCap,
    equity,
    equityUsd,
    totalSupply,
    // todo rest
  };
};
