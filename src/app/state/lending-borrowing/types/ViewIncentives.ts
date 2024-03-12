import { ViewNumber } from "../../../../shared";

interface RewardToken {
  symbol: string;
  logo: string;
  apy: number;
}

export interface ViewIncentives {
  totalApy: ViewNumber;
  rewardTokens: RewardToken[];
}
