import { Address } from "viem";
import { ViewBigInt } from "../../../../shared";

export interface RewardTokenInfo {
  tokenAmount: ViewBigInt;
  dollarAmount: ViewBigInt;
  logo: string;
  address: Address;
}

export interface ViewAllUserRewards {
  totalRewards: ViewBigInt;
  rewards: RewardTokenInfo[] | undefined;
}
