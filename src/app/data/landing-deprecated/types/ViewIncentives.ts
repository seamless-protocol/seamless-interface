import { ViewNumber } from "../../../../shared";

interface RewardToken {
  symbol: string;
  logo?: string;
  apr: ViewNumber;
}

export interface ViewIncentives {
  totalApr?: ViewNumber;
  rewardTokens: RewardToken[];
}
