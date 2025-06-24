import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type ChainlinkAggregator = {
  __typename?: 'ChainlinkAggregator';
  /**  The decimals of the Chainlink aggregator price  */
  decimals: Scalars['Int']['output'];
  /**  Address of the Chainlink aggregator  */
  id: Scalars['Bytes']['output'];
  /**  The current price of the Chainlink aggregator  */
  price: Scalars['BigInt']['output'];
};

export type ChainlinkAggregator_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ChainlinkAggregator_Filter>>>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ChainlinkAggregator_Filter>>>;
  price?: InputMaybe<Scalars['BigInt']['input']>;
  price_gt?: InputMaybe<Scalars['BigInt']['input']>;
  price_gte?: InputMaybe<Scalars['BigInt']['input']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  price_lt?: InputMaybe<Scalars['BigInt']['input']>;
  price_lte?: InputMaybe<Scalars['BigInt']['input']>;
  price_not?: InputMaybe<Scalars['BigInt']['input']>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum ChainlinkAggregator_OrderBy {
  Decimals = 'decimals',
  Id = 'id',
  Price = 'price'
}

export type DutchAuctionRebalanceAdapter = {
  __typename?: 'DutchAuctionRebalanceAdapter';
  /**  The current on-going auction, if there is one. Note: This is only updated when the auction is updated on chain, so it may not be accurate in real time if the max duration has elapsed  */
  _currentAuction?: Maybe<DutchAuctionRebalanceAdapterAuction>;
  /**  History of auctions  */
  auctionHistory: Array<DutchAuctionRebalanceAdapterAuction>;
  /**  The address of the rebalance adapter  */
  id: Scalars['Bytes']['output'];
  /**  The maximum duration allowed for auctions  */
  maxDuration: Scalars['BigInt']['output'];
  /**  The rebalance adapter that the dutch auction rebalance adapter is for  */
  rebalanceAdapter: RebalanceAdapter;
  /**  The total number of auctions that have happened  */
  totalAuctions: Scalars['BigInt']['output'];
};


export type DutchAuctionRebalanceAdapterAuctionHistoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DutchAuctionRebalanceAdapterAuction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DutchAuctionRebalanceAdapterAuction_Filter>;
};

export type DutchAuctionRebalanceAdapterAuction = {
  __typename?: 'DutchAuctionRebalanceAdapterAuction';
  /**  History of takes on this auction  */
  auctionTakeHistory: Array<DutchAuctionRebalanceAdapterAuctionTake>;
  /**  The collateral ratio of the LeverageToken when the auction was created  */
  collateralRatioAtCreation: Scalars['BigInt']['output'];
  /**  The dutch auction rebalance adapter that the auction is for  */
  dutchAuctionRebalanceAdapter: DutchAuctionRebalanceAdapter;
  /**  {RebalanceAdapter address}-{Auction Number}  */
  id: Scalars['ID']['output'];
  /**  Timestamp the auction was created  */
  timestamp: Scalars['Timestamp']['output'];
  /**  Timestamp the auction was completed, null if not yet ended  */
  timestampCompleted?: Maybe<Scalars['Timestamp']['output']>;
};


export type DutchAuctionRebalanceAdapterAuctionAuctionTakeHistoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DutchAuctionRebalanceAdapterAuctionTake_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DutchAuctionRebalanceAdapterAuctionTake_Filter>;
};

export type DutchAuctionRebalanceAdapterAuctionTake = {
  __typename?: 'DutchAuctionRebalanceAdapterAuctionTake';
  /**  Amount in  */
  amountIn: Scalars['BigInt']['output'];
  /**  Amount out  */
  amountOut: Scalars['BigInt']['output'];
  /**  The auction that the take is for  */
  auction: DutchAuctionRebalanceAdapterAuction;
  /**  Auto-incremented timeseries data point ID  */
  id: Scalars['Int8']['output'];
  /**  Price multiplier taken on the auction  */
  priceMultiplier: Scalars['BigInt']['output'];
  /**  The rebalance for this take  */
  rebalance?: Maybe<Rebalance>;
  /**  The timestamp the take was made  */
  timestamp: Scalars['Timestamp']['output'];
};

export type DutchAuctionRebalanceAdapterAuctionTake_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amountIn?: InputMaybe<Scalars['BigInt']['input']>;
  amountIn_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountIn_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountIn_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amountIn_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountIn_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountIn_not?: InputMaybe<Scalars['BigInt']['input']>;
  amountIn_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amountOut?: InputMaybe<Scalars['BigInt']['input']>;
  amountOut_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountOut_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountOut_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amountOut_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountOut_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountOut_not?: InputMaybe<Scalars['BigInt']['input']>;
  amountOut_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<DutchAuctionRebalanceAdapterAuctionTake_Filter>>>;
  auction?: InputMaybe<Scalars['String']['input']>;
  auction_?: InputMaybe<DutchAuctionRebalanceAdapterAuction_Filter>;
  auction_contains?: InputMaybe<Scalars['String']['input']>;
  auction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_ends_with?: InputMaybe<Scalars['String']['input']>;
  auction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_gt?: InputMaybe<Scalars['String']['input']>;
  auction_gte?: InputMaybe<Scalars['String']['input']>;
  auction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auction_lt?: InputMaybe<Scalars['String']['input']>;
  auction_lte?: InputMaybe<Scalars['String']['input']>;
  auction_not?: InputMaybe<Scalars['String']['input']>;
  auction_not_contains?: InputMaybe<Scalars['String']['input']>;
  auction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  auction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  auction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_starts_with?: InputMaybe<Scalars['String']['input']>;
  auction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  id_not?: InputMaybe<Scalars['Int8']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  or?: InputMaybe<Array<InputMaybe<DutchAuctionRebalanceAdapterAuctionTake_Filter>>>;
  priceMultiplier?: InputMaybe<Scalars['BigInt']['input']>;
  priceMultiplier_gt?: InputMaybe<Scalars['BigInt']['input']>;
  priceMultiplier_gte?: InputMaybe<Scalars['BigInt']['input']>;
  priceMultiplier_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  priceMultiplier_lt?: InputMaybe<Scalars['BigInt']['input']>;
  priceMultiplier_lte?: InputMaybe<Scalars['BigInt']['input']>;
  priceMultiplier_not?: InputMaybe<Scalars['BigInt']['input']>;
  priceMultiplier_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rebalance?: InputMaybe<Scalars['Int']['input']>;
  rebalance_?: InputMaybe<Rebalance_Filter>;
  rebalance_gt?: InputMaybe<Scalars['Int']['input']>;
  rebalance_gte?: InputMaybe<Scalars['Int']['input']>;
  rebalance_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  rebalance_lt?: InputMaybe<Scalars['Int']['input']>;
  rebalance_lte?: InputMaybe<Scalars['Int']['input']>;
  rebalance_not?: InputMaybe<Scalars['Int']['input']>;
  rebalance_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
};

export enum DutchAuctionRebalanceAdapterAuctionTake_OrderBy {
  AmountIn = 'amountIn',
  AmountOut = 'amountOut',
  Auction = 'auction',
  AuctionCollateralRatioAtCreation = 'auction__collateralRatioAtCreation',
  AuctionId = 'auction__id',
  AuctionTimestamp = 'auction__timestamp',
  AuctionTimestampCompleted = 'auction__timestampCompleted',
  Id = 'id',
  PriceMultiplier = 'priceMultiplier',
  Rebalance = 'rebalance',
  RebalanceBlockNumber = 'rebalance__blockNumber',
  RebalanceCollateralRatioAfter = 'rebalance__collateralRatioAfter',
  RebalanceCollateralRatioBefore = 'rebalance__collateralRatioBefore',
  RebalanceEquityInCollateralAfter = 'rebalance__equityInCollateralAfter',
  RebalanceEquityInCollateralBefore = 'rebalance__equityInCollateralBefore',
  RebalanceEquityInDebtAfter = 'rebalance__equityInDebtAfter',
  RebalanceEquityInDebtBefore = 'rebalance__equityInDebtBefore',
  RebalanceId = 'rebalance__id',
  RebalanceTimestamp = 'rebalance__timestamp',
  Timestamp = 'timestamp'
}

export type DutchAuctionRebalanceAdapterAuction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DutchAuctionRebalanceAdapterAuction_Filter>>>;
  auctionTakeHistory_?: InputMaybe<DutchAuctionRebalanceAdapterAuctionTake_Filter>;
  collateralRatioAtCreation?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatioAtCreation_gt?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatioAtCreation_gte?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatioAtCreation_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateralRatioAtCreation_lt?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatioAtCreation_lte?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatioAtCreation_not?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatioAtCreation_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dutchAuctionRebalanceAdapter?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_?: InputMaybe<DutchAuctionRebalanceAdapter_Filter>;
  dutchAuctionRebalanceAdapter_contains?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_ends_with?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_gt?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_gte?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dutchAuctionRebalanceAdapter_lt?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_lte?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_not?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_not_contains?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dutchAuctionRebalanceAdapter_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_starts_with?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<DutchAuctionRebalanceAdapterAuction_Filter>>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestampCompleted?: InputMaybe<Scalars['Timestamp']['input']>;
  timestampCompleted_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestampCompleted_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestampCompleted_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestampCompleted_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestampCompleted_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestampCompleted_not?: InputMaybe<Scalars['Timestamp']['input']>;
  timestampCompleted_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
};

export enum DutchAuctionRebalanceAdapterAuction_OrderBy {
  AuctionTakeHistory = 'auctionTakeHistory',
  CollateralRatioAtCreation = 'collateralRatioAtCreation',
  DutchAuctionRebalanceAdapter = 'dutchAuctionRebalanceAdapter',
  DutchAuctionRebalanceAdapterId = 'dutchAuctionRebalanceAdapter__id',
  DutchAuctionRebalanceAdapterMaxDuration = 'dutchAuctionRebalanceAdapter__maxDuration',
  DutchAuctionRebalanceAdapterTotalAuctions = 'dutchAuctionRebalanceAdapter__totalAuctions',
  Id = 'id',
  Timestamp = 'timestamp',
  TimestampCompleted = 'timestampCompleted'
}

export type DutchAuctionRebalanceAdapter_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  _currentAuction?: InputMaybe<Scalars['String']['input']>;
  _currentAuction_?: InputMaybe<DutchAuctionRebalanceAdapterAuction_Filter>;
  _currentAuction_contains?: InputMaybe<Scalars['String']['input']>;
  _currentAuction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _currentAuction_ends_with?: InputMaybe<Scalars['String']['input']>;
  _currentAuction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  _currentAuction_gt?: InputMaybe<Scalars['String']['input']>;
  _currentAuction_gte?: InputMaybe<Scalars['String']['input']>;
  _currentAuction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  _currentAuction_lt?: InputMaybe<Scalars['String']['input']>;
  _currentAuction_lte?: InputMaybe<Scalars['String']['input']>;
  _currentAuction_not?: InputMaybe<Scalars['String']['input']>;
  _currentAuction_not_contains?: InputMaybe<Scalars['String']['input']>;
  _currentAuction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  _currentAuction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  _currentAuction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  _currentAuction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  _currentAuction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  _currentAuction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  _currentAuction_starts_with?: InputMaybe<Scalars['String']['input']>;
  _currentAuction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  and?: InputMaybe<Array<InputMaybe<DutchAuctionRebalanceAdapter_Filter>>>;
  auctionHistory_?: InputMaybe<DutchAuctionRebalanceAdapterAuction_Filter>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  maxDuration?: InputMaybe<Scalars['BigInt']['input']>;
  maxDuration_gt?: InputMaybe<Scalars['BigInt']['input']>;
  maxDuration_gte?: InputMaybe<Scalars['BigInt']['input']>;
  maxDuration_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  maxDuration_lt?: InputMaybe<Scalars['BigInt']['input']>;
  maxDuration_lte?: InputMaybe<Scalars['BigInt']['input']>;
  maxDuration_not?: InputMaybe<Scalars['BigInt']['input']>;
  maxDuration_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<DutchAuctionRebalanceAdapter_Filter>>>;
  rebalanceAdapter?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_?: InputMaybe<RebalanceAdapter_Filter>;
  rebalanceAdapter_contains?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_ends_with?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_gt?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_gte?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rebalanceAdapter_lt?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_lte?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_not?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_not_contains?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rebalanceAdapter_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_starts_with?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  totalAuctions?: InputMaybe<Scalars['BigInt']['input']>;
  totalAuctions_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalAuctions_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalAuctions_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalAuctions_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalAuctions_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalAuctions_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalAuctions_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum DutchAuctionRebalanceAdapter_OrderBy {
  CurrentAuction = '_currentAuction',
  CurrentAuctionCollateralRatioAtCreation = '_currentAuction__collateralRatioAtCreation',
  CurrentAuctionId = '_currentAuction__id',
  CurrentAuctionTimestamp = '_currentAuction__timestamp',
  CurrentAuctionTimestampCompleted = '_currentAuction__timestampCompleted',
  AuctionHistory = 'auctionHistory',
  Id = 'id',
  MaxDuration = 'maxDuration',
  RebalanceAdapter = 'rebalanceAdapter',
  RebalanceAdapterId = 'rebalanceAdapter__id',
  TotalAuctions = 'totalAuctions'
}

export type LendingAdapter = {
  __typename?: 'LendingAdapter';
  /**  Address of the collateral asset  */
  collateralAsset: Scalars['Bytes']['output'];
  /**  Address of the debt asset  */
  debtAsset: Scalars['Bytes']['output'];
  /**  Address of the LendingAdapter  */
  id: Scalars['Bytes']['output'];
  /**  The LeverageTokens using this LendingAdapter  */
  leverageTokens: Array<LeverageToken>;
  /**  Market ID of the LendingAdapter if type is MORPHO, null otherwise  */
  morphoMarketId?: Maybe<Scalars['Bytes']['output']>;
  /**  The oracle used by the LendingAdapter  */
  oracle: Oracle;
  /**  Type of the LendingAdapter (e.g., MORPHO)  */
  type: LendingAdapterType;
};


export type LendingAdapterLeverageTokensArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LeverageToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LeverageToken_Filter>;
};

export enum LendingAdapterType {
  Morpho = 'MORPHO'
}

export type LendingAdapter_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<LendingAdapter_Filter>>>;
  collateralAsset?: InputMaybe<Scalars['Bytes']['input']>;
  collateralAsset_contains?: InputMaybe<Scalars['Bytes']['input']>;
  collateralAsset_gt?: InputMaybe<Scalars['Bytes']['input']>;
  collateralAsset_gte?: InputMaybe<Scalars['Bytes']['input']>;
  collateralAsset_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  collateralAsset_lt?: InputMaybe<Scalars['Bytes']['input']>;
  collateralAsset_lte?: InputMaybe<Scalars['Bytes']['input']>;
  collateralAsset_not?: InputMaybe<Scalars['Bytes']['input']>;
  collateralAsset_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  collateralAsset_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  debtAsset?: InputMaybe<Scalars['Bytes']['input']>;
  debtAsset_contains?: InputMaybe<Scalars['Bytes']['input']>;
  debtAsset_gt?: InputMaybe<Scalars['Bytes']['input']>;
  debtAsset_gte?: InputMaybe<Scalars['Bytes']['input']>;
  debtAsset_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  debtAsset_lt?: InputMaybe<Scalars['Bytes']['input']>;
  debtAsset_lte?: InputMaybe<Scalars['Bytes']['input']>;
  debtAsset_not?: InputMaybe<Scalars['Bytes']['input']>;
  debtAsset_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  debtAsset_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  leverageTokens_?: InputMaybe<LeverageToken_Filter>;
  morphoMarketId?: InputMaybe<Scalars['Bytes']['input']>;
  morphoMarketId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  morphoMarketId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  morphoMarketId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  morphoMarketId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  morphoMarketId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  morphoMarketId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  morphoMarketId_not?: InputMaybe<Scalars['Bytes']['input']>;
  morphoMarketId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  morphoMarketId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<LendingAdapter_Filter>>>;
  oracle?: InputMaybe<Scalars['String']['input']>;
  oracle_?: InputMaybe<Oracle_Filter>;
  oracle_contains?: InputMaybe<Scalars['String']['input']>;
  oracle_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  oracle_ends_with?: InputMaybe<Scalars['String']['input']>;
  oracle_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  oracle_gt?: InputMaybe<Scalars['String']['input']>;
  oracle_gte?: InputMaybe<Scalars['String']['input']>;
  oracle_in?: InputMaybe<Array<Scalars['String']['input']>>;
  oracle_lt?: InputMaybe<Scalars['String']['input']>;
  oracle_lte?: InputMaybe<Scalars['String']['input']>;
  oracle_not?: InputMaybe<Scalars['String']['input']>;
  oracle_not_contains?: InputMaybe<Scalars['String']['input']>;
  oracle_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  oracle_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  oracle_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  oracle_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  oracle_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  oracle_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  oracle_starts_with?: InputMaybe<Scalars['String']['input']>;
  oracle_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<LendingAdapterType>;
  type_in?: InputMaybe<Array<LendingAdapterType>>;
  type_not?: InputMaybe<LendingAdapterType>;
  type_not_in?: InputMaybe<Array<LendingAdapterType>>;
};

export enum LendingAdapter_OrderBy {
  CollateralAsset = 'collateralAsset',
  DebtAsset = 'debtAsset',
  Id = 'id',
  LeverageTokens = 'leverageTokens',
  MorphoMarketId = 'morphoMarketId',
  Oracle = 'oracle',
  OracleDecimals = 'oracle__decimals',
  OracleId = 'oracle__id',
  OraclePrice = 'oracle__price',
  OracleType = 'oracle__type',
  Type = 'type'
}

export type LeverageManager = {
  __typename?: 'LeverageManager';
  /**  The oracles used by LeverageTokens managed by this LeverageManager  */
  _oracles: Array<Oracle>;
  /**  Asset stats for all LeverageTokens managed by this LeverageManager  */
  assetStats: Array<LeverageManagerAssetStats>;
  /**  Address of the LeverageManager  */
  id: Scalars['Bytes']['output'];
  /**  All LeverageTokens managed by this LeverageManager  */
  leverageTokens: Array<LeverageToken>;
  /**  Total number of LeverageTokens managed by this LeverageManager  */
  leverageTokensCount: Scalars['BigInt']['output'];
  /**  Total number of current unique LeverageToken holders across all LeverageTokens managed by this LeverageManager  */
  totalHolders: Scalars['BigInt']['output'];
};


export type LeverageManager_OraclesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Oracle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Oracle_Filter>;
};


export type LeverageManagerAssetStatsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LeverageManagerAssetStats_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LeverageManagerAssetStats_Filter>;
};


export type LeverageManagerLeverageTokensArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LeverageToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LeverageToken_Filter>;
};

export type LeverageManagerAssetStats = {
  __typename?: 'LeverageManagerAssetStats';
  /**  Address of the asset  */
  id: Scalars['Bytes']['output'];
  /**  Address of the LeverageManager  */
  leverageManager: LeverageManager;
  /**  Total collateral of this asset managed by all LeverageTokens managed by this LeverageManager  */
  totalCollateral: Scalars['BigInt']['output'];
};

export type LeverageManagerAssetStats_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<LeverageManagerAssetStats_Filter>>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  leverageManager?: InputMaybe<Scalars['String']['input']>;
  leverageManager_?: InputMaybe<LeverageManager_Filter>;
  leverageManager_contains?: InputMaybe<Scalars['String']['input']>;
  leverageManager_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageManager_ends_with?: InputMaybe<Scalars['String']['input']>;
  leverageManager_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageManager_gt?: InputMaybe<Scalars['String']['input']>;
  leverageManager_gte?: InputMaybe<Scalars['String']['input']>;
  leverageManager_in?: InputMaybe<Array<Scalars['String']['input']>>;
  leverageManager_lt?: InputMaybe<Scalars['String']['input']>;
  leverageManager_lte?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not_contains?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  leverageManager_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageManager_starts_with?: InputMaybe<Scalars['String']['input']>;
  leverageManager_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<LeverageManagerAssetStats_Filter>>>;
  totalCollateral?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateral_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateral_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateral_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalCollateral_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateral_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateral_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateral_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum LeverageManagerAssetStats_OrderBy {
  Id = 'id',
  LeverageManager = 'leverageManager',
  LeverageManagerId = 'leverageManager__id',
  LeverageManagerLeverageTokensCount = 'leverageManager__leverageTokensCount',
  LeverageManagerTotalHolders = 'leverageManager__totalHolders',
  TotalCollateral = 'totalCollateral'
}

export type LeverageManager_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  _oracles_?: InputMaybe<Oracle_Filter>;
  and?: InputMaybe<Array<InputMaybe<LeverageManager_Filter>>>;
  assetStats_?: InputMaybe<LeverageManagerAssetStats_Filter>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  leverageTokensCount?: InputMaybe<Scalars['BigInt']['input']>;
  leverageTokensCount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  leverageTokensCount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  leverageTokensCount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  leverageTokensCount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  leverageTokensCount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  leverageTokensCount_not?: InputMaybe<Scalars['BigInt']['input']>;
  leverageTokensCount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  leverageTokens_?: InputMaybe<LeverageToken_Filter>;
  or?: InputMaybe<Array<InputMaybe<LeverageManager_Filter>>>;
  totalHolders?: InputMaybe<Scalars['BigInt']['input']>;
  totalHolders_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalHolders_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalHolders_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalHolders_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalHolders_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalHolders_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalHolders_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum LeverageManager_OrderBy {
  Oracles = '_oracles',
  AssetStats = 'assetStats',
  Id = 'id',
  LeverageTokens = 'leverageTokens',
  LeverageTokensCount = 'leverageTokensCount',
  TotalHolders = 'totalHolders'
}

export type LeverageToken = {
  __typename?: 'LeverageToken';
  /**  Historical balance changes  */
  balanceChangeHistory: Array<LeverageTokenBalanceChange>;
  /**  Current collateral ratio of the LeverageToken  */
  collateralRatio: Scalars['BigInt']['output'];
  /**  Creation block number  */
  createdBlockNumber: Scalars['BigInt']['output'];
  /**  Creation timestamp  */
  createdTimestamp: Scalars['BigInt']['output'];
  /**  Address of the LeverageToken  */
  id: Scalars['Bytes']['output'];
  /**  The LendingAdapter used by this LeverageToken  */
  lendingAdapter: LendingAdapter;
  /**  The LeverageManager that manages this LeverageToken  */
  leverageManager: LeverageManager;
  /**  User positions in the LeverageToken  */
  positions: Array<Position>;
  /**  The RebalanceAdapter used by this LeverageToken  */
  rebalanceAdapter: RebalanceAdapter;
  /**  Historical rebalances  */
  rebalanceHistory: Array<Rebalance>;
  /**  Historical state updates  */
  stateHistory: Array<LeverageTokenState>;
  /**  Current total collateral across all positions  */
  totalCollateral: Scalars['BigInt']['output'];
  /**  Current total collateral in debt asset across all positions  */
  totalCollateralInDebt: Scalars['BigInt']['output'];
  /**  Current total number of unique LeverageToken holders  */
  totalHolders: Scalars['BigInt']['output'];
  /**  Total management fees earned in shares  */
  totalManagementFees: Scalars['BigInt']['output'];
  /**  Total mint token action fees earned  */
  totalMintTokenActionFees: Scalars['BigInt']['output'];
  /**  Total mint treasury fees earned in shares  */
  totalMintTreasuryFees: Scalars['BigInt']['output'];
  /**  Total redeem token action fees earned  */
  totalRedeemTokenActionFees: Scalars['BigInt']['output'];
  /**  Total redeem treasury fees earned in shares  */
  totalRedeemTreasuryFees: Scalars['BigInt']['output'];
  /**  Current total supply of the LeverageToken  */
  totalSupply: Scalars['BigInt']['output'];
};


export type LeverageTokenBalanceChangeHistoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LeverageTokenBalanceChange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LeverageTokenBalanceChange_Filter>;
};


export type LeverageTokenPositionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Position_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Position_Filter>;
};


export type LeverageTokenRebalanceHistoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Rebalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Rebalance_Filter>;
};


export type LeverageTokenStateHistoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LeverageTokenState_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LeverageTokenState_Filter>;
};

export type LeverageTokenBalanceChange = {
  __typename?: 'LeverageTokenBalanceChange';
  /**  The amount of shares held in the position with the change  */
  amount: Scalars['BigInt']['output'];
  /**  The balance added / removed to the position  */
  amountDelta: Scalars['BigInt']['output'];
  /**  The block number of this data point  */
  blockNumber: Scalars['BigInt']['output'];
  /**  The amount the user deposited for the shares in the collateral asset  */
  equityDepositedInCollateral: Scalars['BigInt']['output'];
  /**  The amount the user deposited for the shares in the debt asset  */
  equityDepositedInDebt: Scalars['BigInt']['output'];
  /**  The equity value of the balance added / removed in collateral asset  */
  equityInCollateral: Scalars['BigInt']['output'];
  /**  The equity value of the balance added / removed in debt asset  */
  equityInDebt: Scalars['BigInt']['output'];
  /**  Auto-incremented timeseries data point ID  */
  id: Scalars['Int8']['output'];
  /**  The LeverageToken that the balance change is for  */
  leverageToken: LeverageToken;
  /**  The position that the balance is for  */
  position: Position;
  /**  The timestamp of this data point  */
  timestamp: Scalars['Timestamp']['output'];
  /**  The type of balance change (MINT, REDEEM, TRANSFER)  */
  type: LeverageTokenBalanceChangeType;
};

export enum LeverageTokenBalanceChangeType {
  Mint = 'MINT',
  Redeem = 'REDEEM',
  Transfer = 'TRANSFER'
}

export type LeverageTokenBalanceChange_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amountDelta?: InputMaybe<Scalars['BigInt']['input']>;
  amountDelta_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountDelta_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountDelta_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amountDelta_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountDelta_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountDelta_not?: InputMaybe<Scalars['BigInt']['input']>;
  amountDelta_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<LeverageTokenBalanceChange_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  equityDepositedInCollateral?: InputMaybe<Scalars['BigInt']['input']>;
  equityDepositedInCollateral_gt?: InputMaybe<Scalars['BigInt']['input']>;
  equityDepositedInCollateral_gte?: InputMaybe<Scalars['BigInt']['input']>;
  equityDepositedInCollateral_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  equityDepositedInCollateral_lt?: InputMaybe<Scalars['BigInt']['input']>;
  equityDepositedInCollateral_lte?: InputMaybe<Scalars['BigInt']['input']>;
  equityDepositedInCollateral_not?: InputMaybe<Scalars['BigInt']['input']>;
  equityDepositedInCollateral_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  equityDepositedInDebt?: InputMaybe<Scalars['BigInt']['input']>;
  equityDepositedInDebt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  equityDepositedInDebt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  equityDepositedInDebt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  equityDepositedInDebt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  equityDepositedInDebt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  equityDepositedInDebt_not?: InputMaybe<Scalars['BigInt']['input']>;
  equityDepositedInDebt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  equityInCollateral?: InputMaybe<Scalars['BigInt']['input']>;
  equityInCollateral_gt?: InputMaybe<Scalars['BigInt']['input']>;
  equityInCollateral_gte?: InputMaybe<Scalars['BigInt']['input']>;
  equityInCollateral_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  equityInCollateral_lt?: InputMaybe<Scalars['BigInt']['input']>;
  equityInCollateral_lte?: InputMaybe<Scalars['BigInt']['input']>;
  equityInCollateral_not?: InputMaybe<Scalars['BigInt']['input']>;
  equityInCollateral_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  equityInDebt?: InputMaybe<Scalars['BigInt']['input']>;
  equityInDebt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  equityInDebt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  equityInDebt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  equityInDebt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  equityInDebt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  equityInDebt_not?: InputMaybe<Scalars['BigInt']['input']>;
  equityInDebt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  id_not?: InputMaybe<Scalars['Int8']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  leverageToken?: InputMaybe<Scalars['String']['input']>;
  leverageToken_?: InputMaybe<LeverageToken_Filter>;
  leverageToken_contains?: InputMaybe<Scalars['String']['input']>;
  leverageToken_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_gt?: InputMaybe<Scalars['String']['input']>;
  leverageToken_gte?: InputMaybe<Scalars['String']['input']>;
  leverageToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  leverageToken_lt?: InputMaybe<Scalars['String']['input']>;
  leverageToken_lte?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  leverageToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<LeverageTokenBalanceChange_Filter>>>;
  position?: InputMaybe<Scalars['String']['input']>;
  position_?: InputMaybe<Position_Filter>;
  position_contains?: InputMaybe<Scalars['String']['input']>;
  position_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_gt?: InputMaybe<Scalars['String']['input']>;
  position_gte?: InputMaybe<Scalars['String']['input']>;
  position_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_lt?: InputMaybe<Scalars['String']['input']>;
  position_lte?: InputMaybe<Scalars['String']['input']>;
  position_not?: InputMaybe<Scalars['String']['input']>;
  position_not_contains?: InputMaybe<Scalars['String']['input']>;
  position_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  position_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  position_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  position_starts_with?: InputMaybe<Scalars['String']['input']>;
  position_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  type?: InputMaybe<LeverageTokenBalanceChangeType>;
  type_in?: InputMaybe<Array<LeverageTokenBalanceChangeType>>;
  type_not?: InputMaybe<LeverageTokenBalanceChangeType>;
  type_not_in?: InputMaybe<Array<LeverageTokenBalanceChangeType>>;
};

export enum LeverageTokenBalanceChange_OrderBy {
  Amount = 'amount',
  AmountDelta = 'amountDelta',
  BlockNumber = 'blockNumber',
  EquityDepositedInCollateral = 'equityDepositedInCollateral',
  EquityDepositedInDebt = 'equityDepositedInDebt',
  EquityInCollateral = 'equityInCollateral',
  EquityInDebt = 'equityInDebt',
  Id = 'id',
  LeverageToken = 'leverageToken',
  LeverageTokenCollateralRatio = 'leverageToken__collateralRatio',
  LeverageTokenCreatedBlockNumber = 'leverageToken__createdBlockNumber',
  LeverageTokenCreatedTimestamp = 'leverageToken__createdTimestamp',
  LeverageTokenId = 'leverageToken__id',
  LeverageTokenTotalCollateral = 'leverageToken__totalCollateral',
  LeverageTokenTotalCollateralInDebt = 'leverageToken__totalCollateralInDebt',
  LeverageTokenTotalHolders = 'leverageToken__totalHolders',
  LeverageTokenTotalManagementFees = 'leverageToken__totalManagementFees',
  LeverageTokenTotalMintTokenActionFees = 'leverageToken__totalMintTokenActionFees',
  LeverageTokenTotalMintTreasuryFees = 'leverageToken__totalMintTreasuryFees',
  LeverageTokenTotalRedeemTokenActionFees = 'leverageToken__totalRedeemTokenActionFees',
  LeverageTokenTotalRedeemTreasuryFees = 'leverageToken__totalRedeemTreasuryFees',
  LeverageTokenTotalSupply = 'leverageToken__totalSupply',
  Position = 'position',
  PositionBalance = 'position__balance',
  PositionId = 'position__id',
  PositionTotalEquityDepositedInCollateral = 'position__totalEquityDepositedInCollateral',
  PositionTotalEquityDepositedInDebt = 'position__totalEquityDepositedInDebt',
  Timestamp = 'timestamp',
  Type = 'type'
}

export type LeverageTokenState = {
  __typename?: 'LeverageTokenState';
  /**  Block number of the update  */
  blockNumber: Scalars['BigInt']['output'];
  /**  The collateral ratio of the LeverageToken  */
  collateralRatio: Scalars['BigInt']['output'];
  /**  The equity value per LeverageToken in collateral  */
  equityPerTokenInCollateral: Scalars['BigInt']['output'];
  /**  The equity value per LeverageToken in debt  */
  equityPerTokenInDebt: Scalars['BigInt']['output'];
  /**  Auto-incremented timeseries data point ID  */
  id: Scalars['Int8']['output'];
  /**  The LeverageToken that the state is for  */
  leverageToken: LeverageToken;
  /**  Timestamp of the update  */
  timestamp: Scalars['Timestamp']['output'];
  /**  The total collateral amount in the LeverageToken  */
  totalCollateral: Scalars['BigInt']['output'];
  /**  The total debt amount in the LeverageToken  */
  totalDebt: Scalars['BigInt']['output'];
  /**  The total equity amount in collateral in the LeverageToken  */
  totalEquityInCollateral: Scalars['BigInt']['output'];
  /**  The total equity amount in debt in the LeverageToken  */
  totalEquityInDebt: Scalars['BigInt']['output'];
  /**  The total supply of the LeverageToken  */
  totalSupply: Scalars['BigInt']['output'];
};

export type LeverageTokenState_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<LeverageTokenState_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateralRatio?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatio_gt?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatio_gte?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatio_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateralRatio_lt?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatio_lte?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatio_not?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatio_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  equityPerTokenInCollateral?: InputMaybe<Scalars['BigInt']['input']>;
  equityPerTokenInCollateral_gt?: InputMaybe<Scalars['BigInt']['input']>;
  equityPerTokenInCollateral_gte?: InputMaybe<Scalars['BigInt']['input']>;
  equityPerTokenInCollateral_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  equityPerTokenInCollateral_lt?: InputMaybe<Scalars['BigInt']['input']>;
  equityPerTokenInCollateral_lte?: InputMaybe<Scalars['BigInt']['input']>;
  equityPerTokenInCollateral_not?: InputMaybe<Scalars['BigInt']['input']>;
  equityPerTokenInCollateral_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  equityPerTokenInDebt?: InputMaybe<Scalars['BigInt']['input']>;
  equityPerTokenInDebt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  equityPerTokenInDebt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  equityPerTokenInDebt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  equityPerTokenInDebt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  equityPerTokenInDebt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  equityPerTokenInDebt_not?: InputMaybe<Scalars['BigInt']['input']>;
  equityPerTokenInDebt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  id_not?: InputMaybe<Scalars['Int8']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  leverageToken?: InputMaybe<Scalars['String']['input']>;
  leverageToken_?: InputMaybe<LeverageToken_Filter>;
  leverageToken_contains?: InputMaybe<Scalars['String']['input']>;
  leverageToken_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_gt?: InputMaybe<Scalars['String']['input']>;
  leverageToken_gte?: InputMaybe<Scalars['String']['input']>;
  leverageToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  leverageToken_lt?: InputMaybe<Scalars['String']['input']>;
  leverageToken_lte?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  leverageToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<LeverageTokenState_Filter>>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  totalCollateral?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateral_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateral_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateral_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalCollateral_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateral_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateral_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateral_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDebt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDebt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDebt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDebt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDebt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDebt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDebt_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalDebt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalEquityInCollateral?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityInCollateral_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityInCollateral_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityInCollateral_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalEquityInCollateral_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityInCollateral_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityInCollateral_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityInCollateral_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalEquityInDebt?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityInDebt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityInDebt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityInDebt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalEquityInDebt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityInDebt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityInDebt_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityInDebt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum LeverageTokenState_OrderBy {
  BlockNumber = 'blockNumber',
  CollateralRatio = 'collateralRatio',
  EquityPerTokenInCollateral = 'equityPerTokenInCollateral',
  EquityPerTokenInDebt = 'equityPerTokenInDebt',
  Id = 'id',
  LeverageToken = 'leverageToken',
  LeverageTokenCollateralRatio = 'leverageToken__collateralRatio',
  LeverageTokenCreatedBlockNumber = 'leverageToken__createdBlockNumber',
  LeverageTokenCreatedTimestamp = 'leverageToken__createdTimestamp',
  LeverageTokenId = 'leverageToken__id',
  LeverageTokenTotalCollateral = 'leverageToken__totalCollateral',
  LeverageTokenTotalCollateralInDebt = 'leverageToken__totalCollateralInDebt',
  LeverageTokenTotalHolders = 'leverageToken__totalHolders',
  LeverageTokenTotalManagementFees = 'leverageToken__totalManagementFees',
  LeverageTokenTotalMintTokenActionFees = 'leverageToken__totalMintTokenActionFees',
  LeverageTokenTotalMintTreasuryFees = 'leverageToken__totalMintTreasuryFees',
  LeverageTokenTotalRedeemTokenActionFees = 'leverageToken__totalRedeemTokenActionFees',
  LeverageTokenTotalRedeemTreasuryFees = 'leverageToken__totalRedeemTreasuryFees',
  LeverageTokenTotalSupply = 'leverageToken__totalSupply',
  Timestamp = 'timestamp',
  TotalCollateral = 'totalCollateral',
  TotalDebt = 'totalDebt',
  TotalEquityInCollateral = 'totalEquityInCollateral',
  TotalEquityInDebt = 'totalEquityInDebt',
  TotalSupply = 'totalSupply'
}

export type LeverageToken_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<LeverageToken_Filter>>>;
  balanceChangeHistory_?: InputMaybe<LeverageTokenBalanceChange_Filter>;
  collateralRatio?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatio_gt?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatio_gte?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatio_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateralRatio_lt?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatio_lte?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatio_not?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatio_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  lendingAdapter?: InputMaybe<Scalars['String']['input']>;
  lendingAdapter_?: InputMaybe<LendingAdapter_Filter>;
  lendingAdapter_contains?: InputMaybe<Scalars['String']['input']>;
  lendingAdapter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  lendingAdapter_ends_with?: InputMaybe<Scalars['String']['input']>;
  lendingAdapter_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  lendingAdapter_gt?: InputMaybe<Scalars['String']['input']>;
  lendingAdapter_gte?: InputMaybe<Scalars['String']['input']>;
  lendingAdapter_in?: InputMaybe<Array<Scalars['String']['input']>>;
  lendingAdapter_lt?: InputMaybe<Scalars['String']['input']>;
  lendingAdapter_lte?: InputMaybe<Scalars['String']['input']>;
  lendingAdapter_not?: InputMaybe<Scalars['String']['input']>;
  lendingAdapter_not_contains?: InputMaybe<Scalars['String']['input']>;
  lendingAdapter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  lendingAdapter_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  lendingAdapter_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  lendingAdapter_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  lendingAdapter_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  lendingAdapter_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  lendingAdapter_starts_with?: InputMaybe<Scalars['String']['input']>;
  lendingAdapter_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageManager?: InputMaybe<Scalars['String']['input']>;
  leverageManager_?: InputMaybe<LeverageManager_Filter>;
  leverageManager_contains?: InputMaybe<Scalars['String']['input']>;
  leverageManager_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageManager_ends_with?: InputMaybe<Scalars['String']['input']>;
  leverageManager_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageManager_gt?: InputMaybe<Scalars['String']['input']>;
  leverageManager_gte?: InputMaybe<Scalars['String']['input']>;
  leverageManager_in?: InputMaybe<Array<Scalars['String']['input']>>;
  leverageManager_lt?: InputMaybe<Scalars['String']['input']>;
  leverageManager_lte?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not_contains?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  leverageManager_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageManager_starts_with?: InputMaybe<Scalars['String']['input']>;
  leverageManager_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<LeverageToken_Filter>>>;
  positions_?: InputMaybe<Position_Filter>;
  rebalanceAdapter?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_?: InputMaybe<RebalanceAdapter_Filter>;
  rebalanceAdapter_contains?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_ends_with?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_gt?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_gte?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rebalanceAdapter_lt?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_lte?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_not?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_not_contains?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rebalanceAdapter_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_starts_with?: InputMaybe<Scalars['String']['input']>;
  rebalanceAdapter_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rebalanceHistory_?: InputMaybe<Rebalance_Filter>;
  stateHistory_?: InputMaybe<LeverageTokenState_Filter>;
  totalCollateral?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateralInDebt?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateralInDebt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateralInDebt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateralInDebt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalCollateralInDebt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateralInDebt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateralInDebt_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateralInDebt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalCollateral_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateral_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateral_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalCollateral_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateral_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateral_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalCollateral_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalHolders?: InputMaybe<Scalars['BigInt']['input']>;
  totalHolders_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalHolders_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalHolders_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalHolders_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalHolders_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalHolders_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalHolders_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalManagementFees?: InputMaybe<Scalars['BigInt']['input']>;
  totalManagementFees_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalManagementFees_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalManagementFees_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalManagementFees_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalManagementFees_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalManagementFees_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalManagementFees_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalMintTokenActionFees?: InputMaybe<Scalars['BigInt']['input']>;
  totalMintTokenActionFees_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalMintTokenActionFees_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalMintTokenActionFees_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalMintTokenActionFees_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalMintTokenActionFees_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalMintTokenActionFees_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalMintTokenActionFees_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalMintTreasuryFees?: InputMaybe<Scalars['BigInt']['input']>;
  totalMintTreasuryFees_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalMintTreasuryFees_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalMintTreasuryFees_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalMintTreasuryFees_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalMintTreasuryFees_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalMintTreasuryFees_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalMintTreasuryFees_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalRedeemTokenActionFees?: InputMaybe<Scalars['BigInt']['input']>;
  totalRedeemTokenActionFees_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRedeemTokenActionFees_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRedeemTokenActionFees_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalRedeemTokenActionFees_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRedeemTokenActionFees_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRedeemTokenActionFees_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalRedeemTokenActionFees_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalRedeemTreasuryFees?: InputMaybe<Scalars['BigInt']['input']>;
  totalRedeemTreasuryFees_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRedeemTreasuryFees_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRedeemTreasuryFees_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalRedeemTreasuryFees_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalRedeemTreasuryFees_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalRedeemTreasuryFees_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalRedeemTreasuryFees_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum LeverageToken_OrderBy {
  BalanceChangeHistory = 'balanceChangeHistory',
  CollateralRatio = 'collateralRatio',
  CreatedBlockNumber = 'createdBlockNumber',
  CreatedTimestamp = 'createdTimestamp',
  Id = 'id',
  LendingAdapter = 'lendingAdapter',
  LendingAdapterCollateralAsset = 'lendingAdapter__collateralAsset',
  LendingAdapterDebtAsset = 'lendingAdapter__debtAsset',
  LendingAdapterId = 'lendingAdapter__id',
  LendingAdapterMorphoMarketId = 'lendingAdapter__morphoMarketId',
  LendingAdapterType = 'lendingAdapter__type',
  LeverageManager = 'leverageManager',
  LeverageManagerId = 'leverageManager__id',
  LeverageManagerLeverageTokensCount = 'leverageManager__leverageTokensCount',
  LeverageManagerTotalHolders = 'leverageManager__totalHolders',
  Positions = 'positions',
  RebalanceAdapter = 'rebalanceAdapter',
  RebalanceAdapterId = 'rebalanceAdapter__id',
  RebalanceHistory = 'rebalanceHistory',
  StateHistory = 'stateHistory',
  TotalCollateral = 'totalCollateral',
  TotalCollateralInDebt = 'totalCollateralInDebt',
  TotalHolders = 'totalHolders',
  TotalManagementFees = 'totalManagementFees',
  TotalMintTokenActionFees = 'totalMintTokenActionFees',
  TotalMintTreasuryFees = 'totalMintTreasuryFees',
  TotalRedeemTokenActionFees = 'totalRedeemTokenActionFees',
  TotalRedeemTreasuryFees = 'totalRedeemTreasuryFees',
  TotalSupply = 'totalSupply'
}

export type MorphoChainlinkOracleData = {
  __typename?: 'MorphoChainlinkOracleData';
  /**  The first base feed aggregator of the oracle  */
  baseAggregatorA: ChainlinkAggregator;
  /**  The second base feed aggregator of the oracle  */
  baseAggregatorB?: Maybe<ChainlinkAggregator>;
  /**  The base vault address of the oracle  */
  baseVault: Scalars['Bytes']['output'];
  id: Scalars['Bytes']['output'];
  /**  The oracle that the MorphoChainlinkOracleData is for  */
  oracle: Oracle;
  /**  The first quote feed aggregator of the oracle  */
  quoteAggregatorA?: Maybe<ChainlinkAggregator>;
  /**  The second quote feed aggregator of the oracle  */
  quoteAggregatorB?: Maybe<ChainlinkAggregator>;
  /**  The quote vault address of the oracle  */
  quoteVault: Scalars['Bytes']['output'];
  /**  The scale factor of the MorphoChainlinkOracle  */
  scaleFactor: Scalars['BigInt']['output'];
};

export type MorphoChainlinkOracleData_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MorphoChainlinkOracleData_Filter>>>;
  baseAggregatorA?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorA_?: InputMaybe<ChainlinkAggregator_Filter>;
  baseAggregatorA_contains?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorA_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorA_ends_with?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorA_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorA_gt?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorA_gte?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorA_in?: InputMaybe<Array<Scalars['String']['input']>>;
  baseAggregatorA_lt?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorA_lte?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorA_not?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorA_not_contains?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorA_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorA_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorA_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorA_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  baseAggregatorA_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorA_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorA_starts_with?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorA_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorB?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorB_?: InputMaybe<ChainlinkAggregator_Filter>;
  baseAggregatorB_contains?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorB_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorB_ends_with?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorB_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorB_gt?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorB_gte?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorB_in?: InputMaybe<Array<Scalars['String']['input']>>;
  baseAggregatorB_lt?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorB_lte?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorB_not?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorB_not_contains?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorB_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorB_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorB_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorB_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  baseAggregatorB_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorB_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorB_starts_with?: InputMaybe<Scalars['String']['input']>;
  baseAggregatorB_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  baseVault?: InputMaybe<Scalars['Bytes']['input']>;
  baseVault_contains?: InputMaybe<Scalars['Bytes']['input']>;
  baseVault_gt?: InputMaybe<Scalars['Bytes']['input']>;
  baseVault_gte?: InputMaybe<Scalars['Bytes']['input']>;
  baseVault_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  baseVault_lt?: InputMaybe<Scalars['Bytes']['input']>;
  baseVault_lte?: InputMaybe<Scalars['Bytes']['input']>;
  baseVault_not?: InputMaybe<Scalars['Bytes']['input']>;
  baseVault_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  baseVault_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<MorphoChainlinkOracleData_Filter>>>;
  oracle?: InputMaybe<Scalars['String']['input']>;
  oracle_?: InputMaybe<Oracle_Filter>;
  oracle_contains?: InputMaybe<Scalars['String']['input']>;
  oracle_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  oracle_ends_with?: InputMaybe<Scalars['String']['input']>;
  oracle_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  oracle_gt?: InputMaybe<Scalars['String']['input']>;
  oracle_gte?: InputMaybe<Scalars['String']['input']>;
  oracle_in?: InputMaybe<Array<Scalars['String']['input']>>;
  oracle_lt?: InputMaybe<Scalars['String']['input']>;
  oracle_lte?: InputMaybe<Scalars['String']['input']>;
  oracle_not?: InputMaybe<Scalars['String']['input']>;
  oracle_not_contains?: InputMaybe<Scalars['String']['input']>;
  oracle_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  oracle_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  oracle_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  oracle_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  oracle_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  oracle_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  oracle_starts_with?: InputMaybe<Scalars['String']['input']>;
  oracle_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorA?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorA_?: InputMaybe<ChainlinkAggregator_Filter>;
  quoteAggregatorA_contains?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorA_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorA_ends_with?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorA_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorA_gt?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorA_gte?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorA_in?: InputMaybe<Array<Scalars['String']['input']>>;
  quoteAggregatorA_lt?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorA_lte?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorA_not?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorA_not_contains?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorA_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorA_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorA_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorA_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  quoteAggregatorA_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorA_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorA_starts_with?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorA_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorB?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorB_?: InputMaybe<ChainlinkAggregator_Filter>;
  quoteAggregatorB_contains?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorB_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorB_ends_with?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorB_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorB_gt?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorB_gte?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorB_in?: InputMaybe<Array<Scalars['String']['input']>>;
  quoteAggregatorB_lt?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorB_lte?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorB_not?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorB_not_contains?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorB_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorB_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorB_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorB_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  quoteAggregatorB_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorB_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorB_starts_with?: InputMaybe<Scalars['String']['input']>;
  quoteAggregatorB_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  quoteVault?: InputMaybe<Scalars['Bytes']['input']>;
  quoteVault_contains?: InputMaybe<Scalars['Bytes']['input']>;
  quoteVault_gt?: InputMaybe<Scalars['Bytes']['input']>;
  quoteVault_gte?: InputMaybe<Scalars['Bytes']['input']>;
  quoteVault_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  quoteVault_lt?: InputMaybe<Scalars['Bytes']['input']>;
  quoteVault_lte?: InputMaybe<Scalars['Bytes']['input']>;
  quoteVault_not?: InputMaybe<Scalars['Bytes']['input']>;
  quoteVault_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  quoteVault_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  scaleFactor?: InputMaybe<Scalars['BigInt']['input']>;
  scaleFactor_gt?: InputMaybe<Scalars['BigInt']['input']>;
  scaleFactor_gte?: InputMaybe<Scalars['BigInt']['input']>;
  scaleFactor_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  scaleFactor_lt?: InputMaybe<Scalars['BigInt']['input']>;
  scaleFactor_lte?: InputMaybe<Scalars['BigInt']['input']>;
  scaleFactor_not?: InputMaybe<Scalars['BigInt']['input']>;
  scaleFactor_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum MorphoChainlinkOracleData_OrderBy {
  BaseAggregatorA = 'baseAggregatorA',
  BaseAggregatorADecimals = 'baseAggregatorA__decimals',
  BaseAggregatorAId = 'baseAggregatorA__id',
  BaseAggregatorAPrice = 'baseAggregatorA__price',
  BaseAggregatorB = 'baseAggregatorB',
  BaseAggregatorBDecimals = 'baseAggregatorB__decimals',
  BaseAggregatorBId = 'baseAggregatorB__id',
  BaseAggregatorBPrice = 'baseAggregatorB__price',
  BaseVault = 'baseVault',
  Id = 'id',
  Oracle = 'oracle',
  OracleDecimals = 'oracle__decimals',
  OracleId = 'oracle__id',
  OraclePrice = 'oracle__price',
  OracleType = 'oracle__type',
  QuoteAggregatorA = 'quoteAggregatorA',
  QuoteAggregatorADecimals = 'quoteAggregatorA__decimals',
  QuoteAggregatorAId = 'quoteAggregatorA__id',
  QuoteAggregatorAPrice = 'quoteAggregatorA__price',
  QuoteAggregatorB = 'quoteAggregatorB',
  QuoteAggregatorBDecimals = 'quoteAggregatorB__decimals',
  QuoteAggregatorBId = 'quoteAggregatorB__id',
  QuoteAggregatorBPrice = 'quoteAggregatorB__price',
  QuoteVault = 'quoteVault',
  ScaleFactor = 'scaleFactor'
}

export type Oracle = {
  __typename?: 'Oracle';
  /**  The decimals of the oracle price  */
  decimals: Scalars['Int']['output'];
  /**  Address of the oracle  */
  id: Scalars['Bytes']['output'];
  /**  The LendingAdapters using this oracle  */
  lendingAdapters: Array<LendingAdapter>;
  /**  The LeverageManager that uses this oracle  */
  leverageManager: LeverageManager;
  /**  The MorphoChainlinkOracle data, if oracle type is MORPHO_CHAINLINK  */
  morphoChainlinkOracleData?: Maybe<MorphoChainlinkOracleData>;
  /**  The current price of the oracle  */
  price: Scalars['BigInt']['output'];
  /**  The price updates for the oracle  */
  priceUpdates: Array<OraclePrice>;
  /**  The type of the oracle  */
  type: OracleType;
};


export type OracleLendingAdaptersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LendingAdapter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LendingAdapter_Filter>;
};


export type OraclePriceUpdatesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OraclePrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OraclePrice_Filter>;
};

export type OraclePrice = {
  __typename?: 'OraclePrice';
  /**  Auto-incremented timeseries data point ID  */
  id: Scalars['Int8']['output'];
  /**  The oracle that the price is for  */
  oracle: Oracle;
  /**  The price of the oracle  */
  price: Scalars['BigInt']['output'];
  /**  The timestamp of the price  */
  timestamp: Scalars['Timestamp']['output'];
};

export type OraclePrice_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<OraclePrice_Filter>>>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  id_not?: InputMaybe<Scalars['Int8']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  or?: InputMaybe<Array<InputMaybe<OraclePrice_Filter>>>;
  oracle?: InputMaybe<Scalars['String']['input']>;
  oracle_?: InputMaybe<Oracle_Filter>;
  oracle_contains?: InputMaybe<Scalars['String']['input']>;
  oracle_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  oracle_ends_with?: InputMaybe<Scalars['String']['input']>;
  oracle_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  oracle_gt?: InputMaybe<Scalars['String']['input']>;
  oracle_gte?: InputMaybe<Scalars['String']['input']>;
  oracle_in?: InputMaybe<Array<Scalars['String']['input']>>;
  oracle_lt?: InputMaybe<Scalars['String']['input']>;
  oracle_lte?: InputMaybe<Scalars['String']['input']>;
  oracle_not?: InputMaybe<Scalars['String']['input']>;
  oracle_not_contains?: InputMaybe<Scalars['String']['input']>;
  oracle_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  oracle_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  oracle_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  oracle_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  oracle_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  oracle_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  oracle_starts_with?: InputMaybe<Scalars['String']['input']>;
  oracle_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['BigInt']['input']>;
  price_gt?: InputMaybe<Scalars['BigInt']['input']>;
  price_gte?: InputMaybe<Scalars['BigInt']['input']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  price_lt?: InputMaybe<Scalars['BigInt']['input']>;
  price_lte?: InputMaybe<Scalars['BigInt']['input']>;
  price_not?: InputMaybe<Scalars['BigInt']['input']>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
};

export enum OraclePrice_OrderBy {
  Id = 'id',
  Oracle = 'oracle',
  OracleDecimals = 'oracle__decimals',
  OracleId = 'oracle__id',
  OraclePrice = 'oracle__price',
  OracleType = 'oracle__type',
  Price = 'price',
  Timestamp = 'timestamp'
}

export enum OracleType {
  MorphoChainlink = 'MORPHO_CHAINLINK'
}

export type Oracle_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Oracle_Filter>>>;
  decimals?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  lendingAdapters_?: InputMaybe<LendingAdapter_Filter>;
  leverageManager?: InputMaybe<Scalars['String']['input']>;
  leverageManager_?: InputMaybe<LeverageManager_Filter>;
  leverageManager_contains?: InputMaybe<Scalars['String']['input']>;
  leverageManager_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageManager_ends_with?: InputMaybe<Scalars['String']['input']>;
  leverageManager_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageManager_gt?: InputMaybe<Scalars['String']['input']>;
  leverageManager_gte?: InputMaybe<Scalars['String']['input']>;
  leverageManager_in?: InputMaybe<Array<Scalars['String']['input']>>;
  leverageManager_lt?: InputMaybe<Scalars['String']['input']>;
  leverageManager_lte?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not_contains?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  leverageManager_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  leverageManager_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageManager_starts_with?: InputMaybe<Scalars['String']['input']>;
  leverageManager_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  morphoChainlinkOracleData?: InputMaybe<Scalars['String']['input']>;
  morphoChainlinkOracleData_?: InputMaybe<MorphoChainlinkOracleData_Filter>;
  morphoChainlinkOracleData_contains?: InputMaybe<Scalars['String']['input']>;
  morphoChainlinkOracleData_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  morphoChainlinkOracleData_ends_with?: InputMaybe<Scalars['String']['input']>;
  morphoChainlinkOracleData_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  morphoChainlinkOracleData_gt?: InputMaybe<Scalars['String']['input']>;
  morphoChainlinkOracleData_gte?: InputMaybe<Scalars['String']['input']>;
  morphoChainlinkOracleData_in?: InputMaybe<Array<Scalars['String']['input']>>;
  morphoChainlinkOracleData_lt?: InputMaybe<Scalars['String']['input']>;
  morphoChainlinkOracleData_lte?: InputMaybe<Scalars['String']['input']>;
  morphoChainlinkOracleData_not?: InputMaybe<Scalars['String']['input']>;
  morphoChainlinkOracleData_not_contains?: InputMaybe<Scalars['String']['input']>;
  morphoChainlinkOracleData_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  morphoChainlinkOracleData_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  morphoChainlinkOracleData_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  morphoChainlinkOracleData_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  morphoChainlinkOracleData_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  morphoChainlinkOracleData_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  morphoChainlinkOracleData_starts_with?: InputMaybe<Scalars['String']['input']>;
  morphoChainlinkOracleData_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Oracle_Filter>>>;
  price?: InputMaybe<Scalars['BigInt']['input']>;
  priceUpdates_?: InputMaybe<OraclePrice_Filter>;
  price_gt?: InputMaybe<Scalars['BigInt']['input']>;
  price_gte?: InputMaybe<Scalars['BigInt']['input']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  price_lt?: InputMaybe<Scalars['BigInt']['input']>;
  price_lte?: InputMaybe<Scalars['BigInt']['input']>;
  price_not?: InputMaybe<Scalars['BigInt']['input']>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  type?: InputMaybe<OracleType>;
  type_in?: InputMaybe<Array<OracleType>>;
  type_not?: InputMaybe<OracleType>;
  type_not_in?: InputMaybe<Array<OracleType>>;
};

export enum Oracle_OrderBy {
  Decimals = 'decimals',
  Id = 'id',
  LendingAdapters = 'lendingAdapters',
  LeverageManager = 'leverageManager',
  LeverageManagerId = 'leverageManager__id',
  LeverageManagerLeverageTokensCount = 'leverageManager__leverageTokensCount',
  LeverageManagerTotalHolders = 'leverageManager__totalHolders',
  MorphoChainlinkOracleData = 'morphoChainlinkOracleData',
  MorphoChainlinkOracleDataBaseVault = 'morphoChainlinkOracleData__baseVault',
  MorphoChainlinkOracleDataId = 'morphoChainlinkOracleData__id',
  MorphoChainlinkOracleDataQuoteVault = 'morphoChainlinkOracleData__quoteVault',
  MorphoChainlinkOracleDataScaleFactor = 'morphoChainlinkOracleData__scaleFactor',
  Price = 'price',
  PriceUpdates = 'priceUpdates',
  Type = 'type'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Position = {
  __typename?: 'Position';
  /**  Balance of the LeverageToken held by the user  */
  balance: Scalars['BigInt']['output'];
  /**  Historical balance changes  */
  balanceChangeHistory: Array<LeverageTokenBalanceChange>;
  /**  { User address }-{ LT address }  */
  id: Scalars['ID']['output'];
  /**  Address of the LeverageToken  */
  leverageToken: LeverageToken;
  /**  Equity deposited by the user in collateral asset of the position for the balance (i.e. the amount without any pnl)  */
  totalEquityDepositedInCollateral: Scalars['BigInt']['output'];
  /**  Equity deposited by the user in debt asset of the position for the balance (i.e. the amount without any pnl)  */
  totalEquityDepositedInDebt: Scalars['BigInt']['output'];
  /**  Address of the user  */
  user: User;
};


export type PositionBalanceChangeHistoryArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LeverageTokenBalanceChange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LeverageTokenBalanceChange_Filter>;
};

export type Position_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Position_Filter>>>;
  balance?: InputMaybe<Scalars['BigInt']['input']>;
  balanceChangeHistory_?: InputMaybe<LeverageTokenBalanceChange_Filter>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  leverageToken?: InputMaybe<Scalars['String']['input']>;
  leverageToken_?: InputMaybe<LeverageToken_Filter>;
  leverageToken_contains?: InputMaybe<Scalars['String']['input']>;
  leverageToken_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_gt?: InputMaybe<Scalars['String']['input']>;
  leverageToken_gte?: InputMaybe<Scalars['String']['input']>;
  leverageToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  leverageToken_lt?: InputMaybe<Scalars['String']['input']>;
  leverageToken_lte?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  leverageToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Position_Filter>>>;
  totalEquityDepositedInCollateral?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityDepositedInCollateral_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityDepositedInCollateral_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityDepositedInCollateral_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalEquityDepositedInCollateral_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityDepositedInCollateral_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityDepositedInCollateral_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityDepositedInCollateral_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalEquityDepositedInDebt?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityDepositedInDebt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityDepositedInDebt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityDepositedInDebt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalEquityDepositedInDebt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityDepositedInDebt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityDepositedInDebt_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalEquityDepositedInDebt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Position_OrderBy {
  Balance = 'balance',
  BalanceChangeHistory = 'balanceChangeHistory',
  Id = 'id',
  LeverageToken = 'leverageToken',
  LeverageTokenCollateralRatio = 'leverageToken__collateralRatio',
  LeverageTokenCreatedBlockNumber = 'leverageToken__createdBlockNumber',
  LeverageTokenCreatedTimestamp = 'leverageToken__createdTimestamp',
  LeverageTokenId = 'leverageToken__id',
  LeverageTokenTotalCollateral = 'leverageToken__totalCollateral',
  LeverageTokenTotalCollateralInDebt = 'leverageToken__totalCollateralInDebt',
  LeverageTokenTotalHolders = 'leverageToken__totalHolders',
  LeverageTokenTotalManagementFees = 'leverageToken__totalManagementFees',
  LeverageTokenTotalMintTokenActionFees = 'leverageToken__totalMintTokenActionFees',
  LeverageTokenTotalMintTreasuryFees = 'leverageToken__totalMintTreasuryFees',
  LeverageTokenTotalRedeemTokenActionFees = 'leverageToken__totalRedeemTokenActionFees',
  LeverageTokenTotalRedeemTreasuryFees = 'leverageToken__totalRedeemTreasuryFees',
  LeverageTokenTotalSupply = 'leverageToken__totalSupply',
  TotalEquityDepositedInCollateral = 'totalEquityDepositedInCollateral',
  TotalEquityDepositedInDebt = 'totalEquityDepositedInDebt',
  User = 'user',
  UserId = 'user__id'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  chainlinkAggregator?: Maybe<ChainlinkAggregator>;
  chainlinkAggregators: Array<ChainlinkAggregator>;
  dutchAuctionRebalanceAdapter?: Maybe<DutchAuctionRebalanceAdapter>;
  dutchAuctionRebalanceAdapterAuction?: Maybe<DutchAuctionRebalanceAdapterAuction>;
  dutchAuctionRebalanceAdapterAuctionTake?: Maybe<DutchAuctionRebalanceAdapterAuctionTake>;
  dutchAuctionRebalanceAdapterAuctionTakes: Array<DutchAuctionRebalanceAdapterAuctionTake>;
  dutchAuctionRebalanceAdapterAuctions: Array<DutchAuctionRebalanceAdapterAuction>;
  dutchAuctionRebalanceAdapters: Array<DutchAuctionRebalanceAdapter>;
  lendingAdapter?: Maybe<LendingAdapter>;
  lendingAdapters: Array<LendingAdapter>;
  leverageManager?: Maybe<LeverageManager>;
  leverageManagerAssetStats?: Maybe<LeverageManagerAssetStats>;
  leverageManagerAssetStats_collection: Array<LeverageManagerAssetStats>;
  leverageManagers: Array<LeverageManager>;
  leverageToken?: Maybe<LeverageToken>;
  leverageTokenBalanceChange?: Maybe<LeverageTokenBalanceChange>;
  leverageTokenBalanceChanges: Array<LeverageTokenBalanceChange>;
  leverageTokenState?: Maybe<LeverageTokenState>;
  leverageTokenStates: Array<LeverageTokenState>;
  leverageTokens: Array<LeverageToken>;
  morphoChainlinkOracleData?: Maybe<MorphoChainlinkOracleData>;
  morphoChainlinkOracleDatas: Array<MorphoChainlinkOracleData>;
  oracle?: Maybe<Oracle>;
  oraclePrice?: Maybe<OraclePrice>;
  oraclePrices: Array<OraclePrice>;
  oracles: Array<Oracle>;
  position?: Maybe<Position>;
  positions: Array<Position>;
  rebalance?: Maybe<Rebalance>;
  rebalanceAction?: Maybe<RebalanceAction>;
  rebalanceActions: Array<RebalanceAction>;
  rebalanceAdapter?: Maybe<RebalanceAdapter>;
  rebalanceAdapters: Array<RebalanceAdapter>;
  rebalances: Array<Rebalance>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryChainlinkAggregatorArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryChainlinkAggregatorsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ChainlinkAggregator_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ChainlinkAggregator_Filter>;
};


export type QueryDutchAuctionRebalanceAdapterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDutchAuctionRebalanceAdapterAuctionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDutchAuctionRebalanceAdapterAuctionTakeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDutchAuctionRebalanceAdapterAuctionTakesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DutchAuctionRebalanceAdapterAuctionTake_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DutchAuctionRebalanceAdapterAuctionTake_Filter>;
};


export type QueryDutchAuctionRebalanceAdapterAuctionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DutchAuctionRebalanceAdapterAuction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DutchAuctionRebalanceAdapterAuction_Filter>;
};


export type QueryDutchAuctionRebalanceAdaptersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DutchAuctionRebalanceAdapter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DutchAuctionRebalanceAdapter_Filter>;
};


export type QueryLendingAdapterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLendingAdaptersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LendingAdapter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LendingAdapter_Filter>;
};


export type QueryLeverageManagerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLeverageManagerAssetStatsArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLeverageManagerAssetStats_CollectionArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LeverageManagerAssetStats_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LeverageManagerAssetStats_Filter>;
};


export type QueryLeverageManagersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LeverageManager_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LeverageManager_Filter>;
};


export type QueryLeverageTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLeverageTokenBalanceChangeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLeverageTokenBalanceChangesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LeverageTokenBalanceChange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LeverageTokenBalanceChange_Filter>;
};


export type QueryLeverageTokenStateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLeverageTokenStatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LeverageTokenState_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LeverageTokenState_Filter>;
};


export type QueryLeverageTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LeverageToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LeverageToken_Filter>;
};


export type QueryMorphoChainlinkOracleDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMorphoChainlinkOracleDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MorphoChainlinkOracleData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MorphoChainlinkOracleData_Filter>;
};


export type QueryOracleArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOraclePriceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOraclePricesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OraclePrice_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OraclePrice_Filter>;
};


export type QueryOraclesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Oracle_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Oracle_Filter>;
};


export type QueryPositionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPositionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Position_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Position_Filter>;
};


export type QueryRebalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRebalanceActionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRebalanceActionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RebalanceAction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RebalanceAction_Filter>;
};


export type QueryRebalanceAdapterArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRebalanceAdaptersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RebalanceAdapter_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RebalanceAdapter_Filter>;
};


export type QueryRebalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Rebalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Rebalance_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type Rebalance = {
  __typename?: 'Rebalance';
  /**  Rebalance actions  */
  actions: Array<RebalanceAction>;
  /**  The block number of the rebalance  */
  blockNumber: Scalars['BigInt']['output'];
  /**  Collateral ratio after the rebalance  */
  collateralRatioAfter: Scalars['BigInt']['output'];
  /**  Collateral ratio before the rebalance  */
  collateralRatioBefore: Scalars['BigInt']['output'];
  /**  The dutch auction take for this rebalance, if the rebalance is a dutch auction rebalance  */
  dutchAuctionTake?: Maybe<DutchAuctionRebalanceAdapterAuctionTake>;
  /**  Equity in collateral asset of the LeverageToken after the rebalance  */
  equityInCollateralAfter: Scalars['BigInt']['output'];
  /**  Equity in collateral asset of the LeverageToken before the rebalance  */
  equityInCollateralBefore: Scalars['BigInt']['output'];
  /**  Equity in debt asset of the LeverageToken after the rebalance  */
  equityInDebtAfter: Scalars['BigInt']['output'];
  /**  Equity in debt asset of the LeverageToken before the rebalance  */
  equityInDebtBefore: Scalars['BigInt']['output'];
  /**  Auto-incremented timeseries data point ID  */
  id: Scalars['Int8']['output'];
  /**  The LeverageToken that the rebalance is for  */
  leverageToken: LeverageToken;
  /**  The timestamp of the rebalance  */
  timestamp: Scalars['Timestamp']['output'];
};


export type RebalanceActionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RebalanceAction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RebalanceAction_Filter>;
};

export type RebalanceAction = {
  __typename?: 'RebalanceAction';
  /**  The amount of collateral or debt added or removed, depending on the action type  */
  amount: Scalars['BigInt']['output'];
  /**  {LeverageToken address}-{Rebalance index}-{Action index in Rebalance event}  */
  id: Scalars['ID']['output'];
  /**  The rebalance that the action is for  */
  rebalance: Rebalance;
  /**  The type of rebalance action  */
  type: RebalanceActionType;
};

export enum RebalanceActionType {
  AddCollateral = 'ADD_COLLATERAL',
  Borrow = 'BORROW',
  RemoveCollateral = 'REMOVE_COLLATERAL',
  Repay = 'REPAY'
}

export type RebalanceAction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<RebalanceAction_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RebalanceAction_Filter>>>;
  rebalance?: InputMaybe<Scalars['Int']['input']>;
  rebalance_?: InputMaybe<Rebalance_Filter>;
  rebalance_gt?: InputMaybe<Scalars['Int']['input']>;
  rebalance_gte?: InputMaybe<Scalars['Int']['input']>;
  rebalance_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  rebalance_lt?: InputMaybe<Scalars['Int']['input']>;
  rebalance_lte?: InputMaybe<Scalars['Int']['input']>;
  rebalance_not?: InputMaybe<Scalars['Int']['input']>;
  rebalance_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  type?: InputMaybe<RebalanceActionType>;
  type_in?: InputMaybe<Array<RebalanceActionType>>;
  type_not?: InputMaybe<RebalanceActionType>;
  type_not_in?: InputMaybe<Array<RebalanceActionType>>;
};

export enum RebalanceAction_OrderBy {
  Amount = 'amount',
  Id = 'id',
  Rebalance = 'rebalance',
  RebalanceBlockNumber = 'rebalance__blockNumber',
  RebalanceCollateralRatioAfter = 'rebalance__collateralRatioAfter',
  RebalanceCollateralRatioBefore = 'rebalance__collateralRatioBefore',
  RebalanceEquityInCollateralAfter = 'rebalance__equityInCollateralAfter',
  RebalanceEquityInCollateralBefore = 'rebalance__equityInCollateralBefore',
  RebalanceEquityInDebtAfter = 'rebalance__equityInDebtAfter',
  RebalanceEquityInDebtBefore = 'rebalance__equityInDebtBefore',
  RebalanceId = 'rebalance__id',
  RebalanceTimestamp = 'rebalance__timestamp',
  Type = 'type'
}

export type RebalanceAdapter = {
  __typename?: 'RebalanceAdapter';
  /**  The dutch auction rebalance adapter data, if the rebalance adapter is using DutchAuctionRebalanceAdapter  */
  dutchAuctionRebalanceAdapter?: Maybe<DutchAuctionRebalanceAdapter>;
  /**  The address of the rebalance adapter  */
  id: Scalars['Bytes']['output'];
  /**  The LeverageToken that the rebalance adapter is for  */
  leverageToken: LeverageToken;
};

export type RebalanceAdapter_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RebalanceAdapter_Filter>>>;
  dutchAuctionRebalanceAdapter?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_?: InputMaybe<DutchAuctionRebalanceAdapter_Filter>;
  dutchAuctionRebalanceAdapter_contains?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_ends_with?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_gt?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_gte?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dutchAuctionRebalanceAdapter_lt?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_lte?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_not?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_not_contains?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dutchAuctionRebalanceAdapter_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_starts_with?: InputMaybe<Scalars['String']['input']>;
  dutchAuctionRebalanceAdapter_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  leverageToken?: InputMaybe<Scalars['String']['input']>;
  leverageToken_?: InputMaybe<LeverageToken_Filter>;
  leverageToken_contains?: InputMaybe<Scalars['String']['input']>;
  leverageToken_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_gt?: InputMaybe<Scalars['String']['input']>;
  leverageToken_gte?: InputMaybe<Scalars['String']['input']>;
  leverageToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  leverageToken_lt?: InputMaybe<Scalars['String']['input']>;
  leverageToken_lte?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  leverageToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<RebalanceAdapter_Filter>>>;
};

export enum RebalanceAdapter_OrderBy {
  DutchAuctionRebalanceAdapter = 'dutchAuctionRebalanceAdapter',
  DutchAuctionRebalanceAdapterId = 'dutchAuctionRebalanceAdapter__id',
  DutchAuctionRebalanceAdapterMaxDuration = 'dutchAuctionRebalanceAdapter__maxDuration',
  DutchAuctionRebalanceAdapterTotalAuctions = 'dutchAuctionRebalanceAdapter__totalAuctions',
  Id = 'id',
  LeverageToken = 'leverageToken',
  LeverageTokenCollateralRatio = 'leverageToken__collateralRatio',
  LeverageTokenCreatedBlockNumber = 'leverageToken__createdBlockNumber',
  LeverageTokenCreatedTimestamp = 'leverageToken__createdTimestamp',
  LeverageTokenId = 'leverageToken__id',
  LeverageTokenTotalCollateral = 'leverageToken__totalCollateral',
  LeverageTokenTotalCollateralInDebt = 'leverageToken__totalCollateralInDebt',
  LeverageTokenTotalHolders = 'leverageToken__totalHolders',
  LeverageTokenTotalManagementFees = 'leverageToken__totalManagementFees',
  LeverageTokenTotalMintTokenActionFees = 'leverageToken__totalMintTokenActionFees',
  LeverageTokenTotalMintTreasuryFees = 'leverageToken__totalMintTreasuryFees',
  LeverageTokenTotalRedeemTokenActionFees = 'leverageToken__totalRedeemTokenActionFees',
  LeverageTokenTotalRedeemTreasuryFees = 'leverageToken__totalRedeemTreasuryFees',
  LeverageTokenTotalSupply = 'leverageToken__totalSupply'
}

export type Rebalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  actions_?: InputMaybe<RebalanceAction_Filter>;
  and?: InputMaybe<Array<InputMaybe<Rebalance_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateralRatioAfter?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatioAfter_gt?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatioAfter_gte?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatioAfter_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateralRatioAfter_lt?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatioAfter_lte?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatioAfter_not?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatioAfter_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateralRatioBefore?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatioBefore_gt?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatioBefore_gte?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatioBefore_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  collateralRatioBefore_lt?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatioBefore_lte?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatioBefore_not?: InputMaybe<Scalars['BigInt']['input']>;
  collateralRatioBefore_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dutchAuctionTake?: InputMaybe<Scalars['Int']['input']>;
  dutchAuctionTake_?: InputMaybe<DutchAuctionRebalanceAdapterAuctionTake_Filter>;
  dutchAuctionTake_gt?: InputMaybe<Scalars['Int']['input']>;
  dutchAuctionTake_gte?: InputMaybe<Scalars['Int']['input']>;
  dutchAuctionTake_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dutchAuctionTake_lt?: InputMaybe<Scalars['Int']['input']>;
  dutchAuctionTake_lte?: InputMaybe<Scalars['Int']['input']>;
  dutchAuctionTake_not?: InputMaybe<Scalars['Int']['input']>;
  dutchAuctionTake_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  equityInCollateralAfter?: InputMaybe<Scalars['BigInt']['input']>;
  equityInCollateralAfter_gt?: InputMaybe<Scalars['BigInt']['input']>;
  equityInCollateralAfter_gte?: InputMaybe<Scalars['BigInt']['input']>;
  equityInCollateralAfter_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  equityInCollateralAfter_lt?: InputMaybe<Scalars['BigInt']['input']>;
  equityInCollateralAfter_lte?: InputMaybe<Scalars['BigInt']['input']>;
  equityInCollateralAfter_not?: InputMaybe<Scalars['BigInt']['input']>;
  equityInCollateralAfter_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  equityInCollateralBefore?: InputMaybe<Scalars['BigInt']['input']>;
  equityInCollateralBefore_gt?: InputMaybe<Scalars['BigInt']['input']>;
  equityInCollateralBefore_gte?: InputMaybe<Scalars['BigInt']['input']>;
  equityInCollateralBefore_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  equityInCollateralBefore_lt?: InputMaybe<Scalars['BigInt']['input']>;
  equityInCollateralBefore_lte?: InputMaybe<Scalars['BigInt']['input']>;
  equityInCollateralBefore_not?: InputMaybe<Scalars['BigInt']['input']>;
  equityInCollateralBefore_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  equityInDebtAfter?: InputMaybe<Scalars['BigInt']['input']>;
  equityInDebtAfter_gt?: InputMaybe<Scalars['BigInt']['input']>;
  equityInDebtAfter_gte?: InputMaybe<Scalars['BigInt']['input']>;
  equityInDebtAfter_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  equityInDebtAfter_lt?: InputMaybe<Scalars['BigInt']['input']>;
  equityInDebtAfter_lte?: InputMaybe<Scalars['BigInt']['input']>;
  equityInDebtAfter_not?: InputMaybe<Scalars['BigInt']['input']>;
  equityInDebtAfter_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  equityInDebtBefore?: InputMaybe<Scalars['BigInt']['input']>;
  equityInDebtBefore_gt?: InputMaybe<Scalars['BigInt']['input']>;
  equityInDebtBefore_gte?: InputMaybe<Scalars['BigInt']['input']>;
  equityInDebtBefore_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  equityInDebtBefore_lt?: InputMaybe<Scalars['BigInt']['input']>;
  equityInDebtBefore_lte?: InputMaybe<Scalars['BigInt']['input']>;
  equityInDebtBefore_not?: InputMaybe<Scalars['BigInt']['input']>;
  equityInDebtBefore_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Int8']['input']>;
  id_gt?: InputMaybe<Scalars['Int8']['input']>;
  id_gte?: InputMaybe<Scalars['Int8']['input']>;
  id_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  id_lt?: InputMaybe<Scalars['Int8']['input']>;
  id_lte?: InputMaybe<Scalars['Int8']['input']>;
  id_not?: InputMaybe<Scalars['Int8']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Int8']['input']>>;
  leverageToken?: InputMaybe<Scalars['String']['input']>;
  leverageToken_?: InputMaybe<LeverageToken_Filter>;
  leverageToken_contains?: InputMaybe<Scalars['String']['input']>;
  leverageToken_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_ends_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_gt?: InputMaybe<Scalars['String']['input']>;
  leverageToken_gte?: InputMaybe<Scalars['String']['input']>;
  leverageToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  leverageToken_lt?: InputMaybe<Scalars['String']['input']>;
  leverageToken_lte?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  leverageToken_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  leverageToken_starts_with?: InputMaybe<Scalars['String']['input']>;
  leverageToken_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Rebalance_Filter>>>;
  timestamp?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not?: InputMaybe<Scalars['Timestamp']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Timestamp']['input']>>;
};

export enum Rebalance_OrderBy {
  Actions = 'actions',
  BlockNumber = 'blockNumber',
  CollateralRatioAfter = 'collateralRatioAfter',
  CollateralRatioBefore = 'collateralRatioBefore',
  DutchAuctionTake = 'dutchAuctionTake',
  DutchAuctionTakeAmountIn = 'dutchAuctionTake__amountIn',
  DutchAuctionTakeAmountOut = 'dutchAuctionTake__amountOut',
  DutchAuctionTakeId = 'dutchAuctionTake__id',
  DutchAuctionTakePriceMultiplier = 'dutchAuctionTake__priceMultiplier',
  DutchAuctionTakeTimestamp = 'dutchAuctionTake__timestamp',
  EquityInCollateralAfter = 'equityInCollateralAfter',
  EquityInCollateralBefore = 'equityInCollateralBefore',
  EquityInDebtAfter = 'equityInDebtAfter',
  EquityInDebtBefore = 'equityInDebtBefore',
  Id = 'id',
  LeverageToken = 'leverageToken',
  LeverageTokenCollateralRatio = 'leverageToken__collateralRatio',
  LeverageTokenCreatedBlockNumber = 'leverageToken__createdBlockNumber',
  LeverageTokenCreatedTimestamp = 'leverageToken__createdTimestamp',
  LeverageTokenId = 'leverageToken__id',
  LeverageTokenTotalCollateral = 'leverageToken__totalCollateral',
  LeverageTokenTotalCollateralInDebt = 'leverageToken__totalCollateralInDebt',
  LeverageTokenTotalHolders = 'leverageToken__totalHolders',
  LeverageTokenTotalManagementFees = 'leverageToken__totalManagementFees',
  LeverageTokenTotalMintTokenActionFees = 'leverageToken__totalMintTokenActionFees',
  LeverageTokenTotalMintTreasuryFees = 'leverageToken__totalMintTreasuryFees',
  LeverageTokenTotalRedeemTokenActionFees = 'leverageToken__totalRedeemTokenActionFees',
  LeverageTokenTotalRedeemTreasuryFees = 'leverageToken__totalRedeemTreasuryFees',
  LeverageTokenTotalSupply = 'leverageToken__totalSupply',
  Timestamp = 'timestamp'
}

export type User = {
  __typename?: 'User';
  /**  Address of the user  */
  id: Scalars['Bytes']['output'];
  /**  Positions that the user has  */
  positions: Array<Position>;
};


export type UserPositionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Position_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Position_Filter>;
};

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  positions_?: InputMaybe<Position_Filter>;
};

export enum User_OrderBy {
  Id = 'id',
  Positions = 'positions'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type CollateralPriceHistoricalQueryVariables = Exact<{
  address: Scalars['ID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CollateralPriceHistoricalQuery = { __typename?: 'Query', leverageToken?: { __typename?: 'LeverageToken', lendingAdapter: { __typename?: 'LendingAdapter', oracle: { __typename?: 'Oracle', decimals: number, priceUpdates: Array<{ __typename?: 'OraclePrice', price: any, timestamp: any }> } } } | null };

export type UserLeverageTokenProfitQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  leverageTokenId: Scalars['String']['input'];
}>;


export type UserLeverageTokenProfitQuery = { __typename?: 'Query', user?: { __typename?: 'User', positions: Array<{ __typename?: 'Position', id: string, totalEquityDepositedInCollateral: any, leverageToken: { __typename?: 'LeverageToken', id: any } }> } | null };

export type LeverageTokenValueHistoricalQueryVariables = Exact<{
  address: Scalars['ID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type LeverageTokenValueHistoricalQuery = { __typename?: 'Query', leverageToken?: { __typename?: 'LeverageToken', stateHistory: Array<{ __typename?: 'LeverageTokenState', equityPerTokenInDebt: any, timestamp: any }> } | null };


export const CollateralPriceHistoricalDocument = gql`
    query CollateralPriceHistorical($address: ID!, $first: Int, $skip: Int) {
  leverageToken(id: $address) {
    lendingAdapter {
      oracle {
        decimals
        priceUpdates(orderBy: timestamp, orderDirection: desc, first: $first, skip: $skip) {
          price
          timestamp
        }
      }
    }
  }
}
    `;
export type CollateralPriceHistoricalQueryResult = Apollo.QueryResult<CollateralPriceHistoricalQuery, CollateralPriceHistoricalQueryVariables>;
export const UserLeverageTokenProfitDocument = gql`
    query UserLeverageTokenProfit($userId: ID!, $leverageTokenId: String!) {
  user(id: $userId) {
    positions(where: {leverageToken: $leverageTokenId}) {
      id
      totalEquityDepositedInCollateral
      leverageToken {
        id
      }
    }
  }
}
    `;
export type UserLeverageTokenProfitQueryResult = Apollo.QueryResult<UserLeverageTokenProfitQuery, UserLeverageTokenProfitQueryVariables>;
export const LeverageTokenValueHistoricalDocument = gql`
    query LeverageTokenValueHistorical($address: ID!, $first: Int, $skip: Int) {
  leverageToken(id: $address) {
    stateHistory(orderBy: timestamp, orderDirection: desc, first: $first, skip: $skip) {
      equityPerTokenInDebt
      timestamp
    }
  }
}
    `;
export type LeverageTokenValueHistoricalQueryResult = Apollo.QueryResult<LeverageTokenValueHistoricalQuery, LeverageTokenValueHistoricalQueryVariables>;