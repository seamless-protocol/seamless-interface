import { FetchBigInt, Token, ViewBigInt, ViewNumber } from "@shared";

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

export interface RewardAmountBigInt {
  total?: bigint;
  claimable_now?: bigint;
  claimable_next?: bigint;
  claimed?: bigint;
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
  combinedAmount: RewardAmount;
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

export interface SummedUserReward {
  token: Token;
  asset: RewardAsset;

  combinedAmount: RewardAmountBigInt;

  combinedClaimableNowUsd?: FetchBigInt;
  combinedClaimableNextUsd?: FetchBigInt;

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
}

export interface VaultStateReward {
  __typename?: "VaultStateReward";
  amountPerSuppliedToken: any;
  supplyApr?: number | null;
  asset: {
    __typename?: "Asset";
    name: string;
    decimals: number;
    logoURI?: string | null;
    symbol: string;
    address: any;
  };
}

export interface VaultStateReward {
  __typename?: "VaultStateReward";
  amountPerSuppliedToken: any;
  supplyApr?: number | null;
  asset: {
    __typename?: "Asset";
    name: string;
    decimals: number;
    logoURI?: string | null;
    symbol: string;
    address: any;
  };
}

export type NetApyData = {
  netApy: ViewNumber;
  nativeAPY: ViewNumber;
  // todo share asset type
  rewards: Array<{
    asset: {
      name: string;
      symbol: string;
      address: any;
      logoURI?: string | null;
      decimals: number;
    };
    totalAprPercent: ViewNumber;
  }>;
};
