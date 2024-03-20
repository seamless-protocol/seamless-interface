import { ViewNumber } from "../../../../shared";

interface RewardToken {
  symbol: string;
  logo: string;
  apr: number;
}

export interface ViewIncentives {
  totalApr: ViewNumber;
  rewardTokens: RewardToken[];
}
