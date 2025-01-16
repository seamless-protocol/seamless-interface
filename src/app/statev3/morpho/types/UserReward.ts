import { FetchBigInt, Token, ViewBigInt } from "@shared";

// Interfaces for API response
export interface RewardAsset {
  id: string;
  address: string;
  chain_id: number;
}

export interface RewardAmount {
  total?: string;
  claimable_now?: string;
  claimable_next?: string;
  claimed?: string;
}

export interface RewardProgram {
  vault?: string;
  chain_id: number;
  rate_per_year?: string;
  asset: RewardAsset;
  distributor?: RewardAsset;
  creator?: string;
  blacklist?: string[];
  start?: string;
  end?: string;
  created_at?: string;
  type?: string;
  id: string;
}

export interface UserReward {
  user: string;
  type: string;
  asset: RewardAsset;
  program_id?: string;
  amount?: RewardAmount;
  program?: RewardProgram;
  for_supply?: RewardAmount;
}

export interface ExtendedUserReward extends UserReward {
  token: Token;
  formatted: {
    total?: ViewBigInt;
    claimableNow?: ViewBigInt;
    claimableNext?: ViewBigInt;
    claimed?: ViewBigInt;

    totalUsd?: ViewBigInt;
    claimableNowUsd?: ViewBigInt;
    claimableNextUsd?: ViewBigInt;
    claimedUsd?: ViewBigInt;
  };
  combinedAmount: RewardAmount
  combinedAmountUsd: FetchBigInt;
}

export interface RewardsPagination {
  per_page: number;
  page: number;
  total_pages: number;
  next: string | null;
  prev: string | null;
}

export interface FetchUserRewardsResponse {
  timestamp: string;
  pagination: RewardsPagination;
  data: UserReward[];
}
