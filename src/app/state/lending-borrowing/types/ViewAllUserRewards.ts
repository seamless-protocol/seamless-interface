import { ViewBigInt } from "../../../../shared";

export interface RewardTokenInfo {
  tokenAmount: ViewBigInt;
  dollarAmount: ViewBigInt;
  logo: string;
}

export interface ViewAllUserRewards {
  totalRewards: ViewBigInt;
  rewards: RewardTokenInfo[] | undefined;
}
