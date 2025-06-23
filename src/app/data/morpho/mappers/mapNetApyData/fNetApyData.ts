import { FullVaultInfoQuery } from "../../../../../generated-graphql";
import { formatFetchNumberToViewNumber } from "@shared";
import { NetApyData } from "../../types/UserReward";
import { cNetApyData } from "./cNetApyData";

export function fNetApyData(vaultState: FullVaultInfoQuery["vaultByAddress"]["state"]): NetApyData | undefined {
  const calculated = cNetApyData(vaultState);
  if (!calculated) return undefined;

  return {
    netApy: formatFetchNumberToViewNumber({
      value: calculated.netApy,
      symbol: "%",
    }),
    nativeAPY: formatFetchNumberToViewNumber({
      value: calculated.nativeAPY,
      symbol: "%",
    }),
    rewards: calculated.rewards.map((reward) => ({
      asset: reward.asset,
      totalAprPercent: formatFetchNumberToViewNumber({
        value: reward.totalApr,
        symbol: "%",
      }),
    })),
  };
}
