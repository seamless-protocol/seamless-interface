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

export type AttributorFeeUpdated = {
  __typename?: 'AttributorFeeUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  value: Scalars['BigInt']['output'];
};

export type AttributorFeeUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AttributorFeeUpdated_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  or?: InputMaybe<Array<InputMaybe<AttributorFeeUpdated_Filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  value?: InputMaybe<Scalars['BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['BigInt']['input']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_lt?: InputMaybe<Scalars['BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['BigInt']['input']>;
  value_not?: InputMaybe<Scalars['BigInt']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum AttributorFeeUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  TransactionHash = 'transactionHash',
  Value = 'value'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type Budget = {
  __typename?: 'Budget';
  amount: Scalars['BigInt']['output'];
  chainId: Scalars['Int']['output'];
  currency: Scalars['Bytes']['output'];
  id: Scalars['ID']['output'];
  owner: Project;
  remainingBudgetReferenceAmount: Scalars['BigInt']['output'];
};

export type Budget_Filter = {
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
  and?: InputMaybe<Array<InputMaybe<Budget_Filter>>>;
  chainId?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  currency?: InputMaybe<Scalars['Bytes']['input']>;
  currency_contains?: InputMaybe<Scalars['Bytes']['input']>;
  currency_gt?: InputMaybe<Scalars['Bytes']['input']>;
  currency_gte?: InputMaybe<Scalars['Bytes']['input']>;
  currency_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  currency_lt?: InputMaybe<Scalars['Bytes']['input']>;
  currency_lte?: InputMaybe<Scalars['Bytes']['input']>;
  currency_not?: InputMaybe<Scalars['Bytes']['input']>;
  currency_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  currency_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Budget_Filter>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_?: InputMaybe<Project_Filter>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  remainingBudgetReferenceAmount?: InputMaybe<Scalars['BigInt']['input']>;
  remainingBudgetReferenceAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  remainingBudgetReferenceAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  remainingBudgetReferenceAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  remainingBudgetReferenceAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  remainingBudgetReferenceAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  remainingBudgetReferenceAmount_not?: InputMaybe<Scalars['BigInt']['input']>;
  remainingBudgetReferenceAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Budget_OrderBy {
  Amount = 'amount',
  ChainId = 'chainId',
  Currency = 'currency',
  Id = 'id',
  Owner = 'owner',
  OwnerClientFeeCollector = 'owner__clientFeeCollector',
  OwnerDeployedAddress = 'owner__deployedAddress',
  OwnerEventSigner = 'owner__eventSigner',
  OwnerId = 'owner__id',
  OwnerLastRemovalApplication = 'owner__lastRemovalApplication',
  OwnerProjectId = 'owner__projectId',
  OwnerProjectInfoUri = 'owner__projectInfoURI',
  RemainingBudgetReferenceAmount = 'remainingBudgetReferenceAmount'
}

export type ClientFeeUpdated = {
  __typename?: 'ClientFeeUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  value: Scalars['BigInt']['output'];
};

export type ClientFeeUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ClientFeeUpdated_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  or?: InputMaybe<Array<InputMaybe<ClientFeeUpdated_Filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  value?: InputMaybe<Scalars['BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['BigInt']['input']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_lt?: InputMaybe<Scalars['BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['BigInt']['input']>;
  value_not?: InputMaybe<Scalars['BigInt']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum ClientFeeUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  TransactionHash = 'transactionHash',
  Value = 'value'
}

export type CurrencyAdded = {
  __typename?: 'CurrencyAdded';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  newCurrency: Scalars['Bytes']['output'];
  tokenType: Scalars['Int']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type CurrencyAdded_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CurrencyAdded_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  newCurrency?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_gt?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_gte?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newCurrency_lt?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_lte?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_not?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<CurrencyAdded_Filter>>>;
  tokenType?: InputMaybe<Scalars['Int']['input']>;
  tokenType_gt?: InputMaybe<Scalars['Int']['input']>;
  tokenType_gte?: InputMaybe<Scalars['Int']['input']>;
  tokenType_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tokenType_lt?: InputMaybe<Scalars['Int']['input']>;
  tokenType_lte?: InputMaybe<Scalars['Int']['input']>;
  tokenType_not?: InputMaybe<Scalars['Int']['input']>;
  tokenType_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum CurrencyAdded_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  NewCurrency = 'newCurrency',
  TokenType = 'tokenType',
  TransactionHash = 'transactionHash'
}

export type CurrencyRemoved = {
  __typename?: 'CurrencyRemoved';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  newCurrency: Scalars['Bytes']['output'];
  tokenType: Scalars['Int']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type CurrencyRemoved_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CurrencyRemoved_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  newCurrency?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_gt?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_gte?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newCurrency_lt?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_lte?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_not?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<CurrencyRemoved_Filter>>>;
  tokenType?: InputMaybe<Scalars['Int']['input']>;
  tokenType_gt?: InputMaybe<Scalars['Int']['input']>;
  tokenType_gte?: InputMaybe<Scalars['Int']['input']>;
  tokenType_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tokenType_lt?: InputMaybe<Scalars['Int']['input']>;
  tokenType_lte?: InputMaybe<Scalars['Int']['input']>;
  tokenType_not?: InputMaybe<Scalars['Int']['input']>;
  tokenType_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum CurrencyRemoved_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  NewCurrency = 'newCurrency',
  TokenType = 'tokenType',
  TransactionHash = 'transactionHash'
}

export type NftFeeCurrencyUpdated = {
  __typename?: 'NftFeeCurrencyUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  newCurrency: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type NftFeeCurrencyUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NftFeeCurrencyUpdated_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  newCurrency?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_gt?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_gte?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newCurrency_lt?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_lte?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_not?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newCurrency_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<NftFeeCurrencyUpdated_Filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum NftFeeCurrencyUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  NewCurrency = 'newCurrency',
  TransactionHash = 'transactionHash'
}

export type NftFixedFeeUpdated = {
  __typename?: 'NftFixedFeeUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  value: Scalars['BigInt']['output'];
};

export type NftFixedFeeUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<NftFixedFeeUpdated_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  or?: InputMaybe<Array<InputMaybe<NftFixedFeeUpdated_Filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  value?: InputMaybe<Scalars['BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['BigInt']['input']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_lt?: InputMaybe<Scalars['BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['BigInt']['input']>;
  value_not?: InputMaybe<Scalars['BigInt']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum NftFixedFeeUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  TransactionHash = 'transactionHash',
  Value = 'value'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Project = {
  __typename?: 'Project';
  budgets?: Maybe<Array<Budget>>;
  clientFeeCollector: Scalars['Bytes']['output'];
  deployedAddress: Scalars['Bytes']['output'];
  eventSigner: Scalars['Bytes']['output'];
  id: Scalars['ID']['output'];
  lastRemovalApplication?: Maybe<Scalars['BigInt']['output']>;
  members?: Maybe<Array<ProjectMember>>;
  projectId: Scalars['BigInt']['output'];
  projectInfoURI: Scalars['String']['output'];
  userBalances?: Maybe<Array<UserBalance>>;
};


export type ProjectBudgetsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Budget_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Budget_Filter>;
};


export type ProjectMembersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProjectMember_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProjectMember_Filter>;
};


export type ProjectUserBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserBalance_Filter>;
};

export type ProjectCooldownUpdated = {
  __typename?: 'ProjectCooldownUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  value: Scalars['BigInt']['output'];
};

export type ProjectCooldownUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProjectCooldownUpdated_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  or?: InputMaybe<Array<InputMaybe<ProjectCooldownUpdated_Filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  value?: InputMaybe<Scalars['BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['BigInt']['input']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_lt?: InputMaybe<Scalars['BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['BigInt']['input']>;
  value_not?: InputMaybe<Scalars['BigInt']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum ProjectCooldownUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  TransactionHash = 'transactionHash',
  Value = 'value'
}

export type ProjectMember = {
  __typename?: 'ProjectMember';
  address: Scalars['Bytes']['output'];
  id: Scalars['ID']['output'];
  project: Project;
  role: Scalars['String']['output'];
};

export type ProjectMember_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['Bytes']['input']>;
  address_not?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<ProjectMember_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ProjectMember_Filter>>>;
  project?: InputMaybe<Scalars['String']['input']>;
  project_?: InputMaybe<Project_Filter>;
  project_contains?: InputMaybe<Scalars['String']['input']>;
  project_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  project_ends_with?: InputMaybe<Scalars['String']['input']>;
  project_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  project_gt?: InputMaybe<Scalars['String']['input']>;
  project_gte?: InputMaybe<Scalars['String']['input']>;
  project_in?: InputMaybe<Array<Scalars['String']['input']>>;
  project_lt?: InputMaybe<Scalars['String']['input']>;
  project_lte?: InputMaybe<Scalars['String']['input']>;
  project_not?: InputMaybe<Scalars['String']['input']>;
  project_not_contains?: InputMaybe<Scalars['String']['input']>;
  project_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  project_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  project_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  project_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  project_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  project_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  project_starts_with?: InputMaybe<Scalars['String']['input']>;
  project_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  role_contains?: InputMaybe<Scalars['String']['input']>;
  role_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  role_ends_with?: InputMaybe<Scalars['String']['input']>;
  role_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  role_gt?: InputMaybe<Scalars['String']['input']>;
  role_gte?: InputMaybe<Scalars['String']['input']>;
  role_in?: InputMaybe<Array<Scalars['String']['input']>>;
  role_lt?: InputMaybe<Scalars['String']['input']>;
  role_lte?: InputMaybe<Scalars['String']['input']>;
  role_not?: InputMaybe<Scalars['String']['input']>;
  role_not_contains?: InputMaybe<Scalars['String']['input']>;
  role_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  role_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  role_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  role_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  role_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  role_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  role_starts_with?: InputMaybe<Scalars['String']['input']>;
  role_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum ProjectMember_OrderBy {
  Address = 'address',
  Id = 'id',
  Project = 'project',
  ProjectClientFeeCollector = 'project__clientFeeCollector',
  ProjectDeployedAddress = 'project__deployedAddress',
  ProjectEventSigner = 'project__eventSigner',
  ProjectId = 'project__id',
  ProjectLastRemovalApplication = 'project__lastRemovalApplication',
  ProjectProjectId = 'project__projectId',
  ProjectProjectInfoUri = 'project__projectInfoURI',
  Role = 'role'
}

export type ProjectRemovePeriodUpdated = {
  __typename?: 'ProjectRemovePeriodUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  value: Scalars['BigInt']['output'];
};

export type ProjectRemovePeriodUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProjectRemovePeriodUpdated_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  or?: InputMaybe<Array<InputMaybe<ProjectRemovePeriodUpdated_Filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  value?: InputMaybe<Scalars['BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['BigInt']['input']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_lt?: InputMaybe<Scalars['BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['BigInt']['input']>;
  value_not?: InputMaybe<Scalars['BigInt']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum ProjectRemovePeriodUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  TransactionHash = 'transactionHash',
  Value = 'value'
}

export type Project_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Project_Filter>>>;
  budgets_?: InputMaybe<Budget_Filter>;
  clientFeeCollector?: InputMaybe<Scalars['Bytes']['input']>;
  clientFeeCollector_contains?: InputMaybe<Scalars['Bytes']['input']>;
  clientFeeCollector_gt?: InputMaybe<Scalars['Bytes']['input']>;
  clientFeeCollector_gte?: InputMaybe<Scalars['Bytes']['input']>;
  clientFeeCollector_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  clientFeeCollector_lt?: InputMaybe<Scalars['Bytes']['input']>;
  clientFeeCollector_lte?: InputMaybe<Scalars['Bytes']['input']>;
  clientFeeCollector_not?: InputMaybe<Scalars['Bytes']['input']>;
  clientFeeCollector_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  clientFeeCollector_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  deployedAddress?: InputMaybe<Scalars['Bytes']['input']>;
  deployedAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  deployedAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  deployedAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  deployedAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  deployedAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  deployedAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  deployedAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  deployedAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  deployedAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  eventSigner?: InputMaybe<Scalars['Bytes']['input']>;
  eventSigner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  eventSigner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  eventSigner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  eventSigner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  eventSigner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  eventSigner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  eventSigner_not?: InputMaybe<Scalars['Bytes']['input']>;
  eventSigner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  eventSigner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lastRemovalApplication?: InputMaybe<Scalars['BigInt']['input']>;
  lastRemovalApplication_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastRemovalApplication_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastRemovalApplication_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastRemovalApplication_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastRemovalApplication_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastRemovalApplication_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastRemovalApplication_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  members_?: InputMaybe<ProjectMember_Filter>;
  or?: InputMaybe<Array<InputMaybe<Project_Filter>>>;
  projectId?: InputMaybe<Scalars['BigInt']['input']>;
  projectId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  projectId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  projectId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  projectId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  projectId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  projectId_not?: InputMaybe<Scalars['BigInt']['input']>;
  projectId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  projectInfoURI?: InputMaybe<Scalars['String']['input']>;
  projectInfoURI_contains?: InputMaybe<Scalars['String']['input']>;
  projectInfoURI_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  projectInfoURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  projectInfoURI_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  projectInfoURI_gt?: InputMaybe<Scalars['String']['input']>;
  projectInfoURI_gte?: InputMaybe<Scalars['String']['input']>;
  projectInfoURI_in?: InputMaybe<Array<Scalars['String']['input']>>;
  projectInfoURI_lt?: InputMaybe<Scalars['String']['input']>;
  projectInfoURI_lte?: InputMaybe<Scalars['String']['input']>;
  projectInfoURI_not?: InputMaybe<Scalars['String']['input']>;
  projectInfoURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  projectInfoURI_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  projectInfoURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  projectInfoURI_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  projectInfoURI_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  projectInfoURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  projectInfoURI_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  projectInfoURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  projectInfoURI_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  userBalances_?: InputMaybe<UserBalance_Filter>;
};

export enum Project_OrderBy {
  Budgets = 'budgets',
  ClientFeeCollector = 'clientFeeCollector',
  DeployedAddress = 'deployedAddress',
  EventSigner = 'eventSigner',
  Id = 'id',
  LastRemovalApplication = 'lastRemovalApplication',
  Members = 'members',
  ProjectId = 'projectId',
  ProjectInfoUri = 'projectInfoURI',
  UserBalances = 'userBalances'
}

export type ProtocolFeeCollectorUpdated = {
  __typename?: 'ProtocolFeeCollectorUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  newCollector: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ProtocolFeeCollectorUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProtocolFeeCollectorUpdated_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  newCollector?: InputMaybe<Scalars['Bytes']['input']>;
  newCollector_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newCollector_gt?: InputMaybe<Scalars['Bytes']['input']>;
  newCollector_gte?: InputMaybe<Scalars['Bytes']['input']>;
  newCollector_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newCollector_lt?: InputMaybe<Scalars['Bytes']['input']>;
  newCollector_lte?: InputMaybe<Scalars['Bytes']['input']>;
  newCollector_not?: InputMaybe<Scalars['Bytes']['input']>;
  newCollector_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newCollector_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ProtocolFeeCollectorUpdated_Filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum ProtocolFeeCollectorUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  NewCollector = 'newCollector',
  TransactionHash = 'transactionHash'
}

export type ProtocolFeeUpdated = {
  __typename?: 'ProtocolFeeUpdated';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  value: Scalars['BigInt']['output'];
};

export type ProtocolFeeUpdated_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProtocolFeeUpdated_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  or?: InputMaybe<Array<InputMaybe<ProtocolFeeUpdated_Filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  value?: InputMaybe<Scalars['BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['BigInt']['input']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_lt?: InputMaybe<Scalars['BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['BigInt']['input']>;
  value_not?: InputMaybe<Scalars['BigInt']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum ProtocolFeeUpdated_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  TransactionHash = 'transactionHash',
  Value = 'value'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  attributorFeeUpdated?: Maybe<AttributorFeeUpdated>;
  attributorFeeUpdateds: Array<AttributorFeeUpdated>;
  budget?: Maybe<Budget>;
  budgets: Array<Budget>;
  clientFeeUpdated?: Maybe<ClientFeeUpdated>;
  clientFeeUpdateds: Array<ClientFeeUpdated>;
  currencyAdded?: Maybe<CurrencyAdded>;
  currencyAddeds: Array<CurrencyAdded>;
  currencyRemoved?: Maybe<CurrencyRemoved>;
  currencyRemoveds: Array<CurrencyRemoved>;
  nftFeeCurrencyUpdated?: Maybe<NftFeeCurrencyUpdated>;
  nftFeeCurrencyUpdateds: Array<NftFeeCurrencyUpdated>;
  nftFixedFeeUpdated?: Maybe<NftFixedFeeUpdated>;
  nftFixedFeeUpdateds: Array<NftFixedFeeUpdated>;
  project?: Maybe<Project>;
  projectCooldownUpdated?: Maybe<ProjectCooldownUpdated>;
  projectCooldownUpdateds: Array<ProjectCooldownUpdated>;
  projectMember?: Maybe<ProjectMember>;
  projectMembers: Array<ProjectMember>;
  projectRemovePeriodUpdated?: Maybe<ProjectRemovePeriodUpdated>;
  projectRemovePeriodUpdateds: Array<ProjectRemovePeriodUpdated>;
  projects: Array<Project>;
  protocolFeeCollectorUpdated?: Maybe<ProtocolFeeCollectorUpdated>;
  protocolFeeCollectorUpdateds: Array<ProtocolFeeCollectorUpdated>;
  protocolFeeUpdated?: Maybe<ProtocolFeeUpdated>;
  protocolFeeUpdateds: Array<ProtocolFeeUpdated>;
  user?: Maybe<User>;
  userBalance?: Maybe<UserBalance>;
  userBalances: Array<UserBalance>;
  users: Array<User>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAttributorFeeUpdatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAttributorFeeUpdatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AttributorFeeUpdated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AttributorFeeUpdated_Filter>;
};


export type QueryBudgetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBudgetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Budget_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Budget_Filter>;
};


export type QueryClientFeeUpdatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryClientFeeUpdatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ClientFeeUpdated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ClientFeeUpdated_Filter>;
};


export type QueryCurrencyAddedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCurrencyAddedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CurrencyAdded_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CurrencyAdded_Filter>;
};


export type QueryCurrencyRemovedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCurrencyRemovedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CurrencyRemoved_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CurrencyRemoved_Filter>;
};


export type QueryNftFeeCurrencyUpdatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryNftFeeCurrencyUpdatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NftFeeCurrencyUpdated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NftFeeCurrencyUpdated_Filter>;
};


export type QueryNftFixedFeeUpdatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryNftFixedFeeUpdatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NftFixedFeeUpdated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NftFixedFeeUpdated_Filter>;
};


export type QueryProjectArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProjectCooldownUpdatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProjectCooldownUpdatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProjectCooldownUpdated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProjectCooldownUpdated_Filter>;
};


export type QueryProjectMemberArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProjectMembersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProjectMember_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProjectMember_Filter>;
};


export type QueryProjectRemovePeriodUpdatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProjectRemovePeriodUpdatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProjectRemovePeriodUpdated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProjectRemovePeriodUpdated_Filter>;
};


export type QueryProjectsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Project_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Project_Filter>;
};


export type QueryProtocolFeeCollectorUpdatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProtocolFeeCollectorUpdatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProtocolFeeCollectorUpdated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProtocolFeeCollectorUpdated_Filter>;
};


export type QueryProtocolFeeUpdatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProtocolFeeUpdatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProtocolFeeUpdated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProtocolFeeUpdated_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUserBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUserBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserBalance_Filter>;
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

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  attributorFeeUpdated?: Maybe<AttributorFeeUpdated>;
  attributorFeeUpdateds: Array<AttributorFeeUpdated>;
  budget?: Maybe<Budget>;
  budgets: Array<Budget>;
  clientFeeUpdated?: Maybe<ClientFeeUpdated>;
  clientFeeUpdateds: Array<ClientFeeUpdated>;
  currencyAdded?: Maybe<CurrencyAdded>;
  currencyAddeds: Array<CurrencyAdded>;
  currencyRemoved?: Maybe<CurrencyRemoved>;
  currencyRemoveds: Array<CurrencyRemoved>;
  nftFeeCurrencyUpdated?: Maybe<NftFeeCurrencyUpdated>;
  nftFeeCurrencyUpdateds: Array<NftFeeCurrencyUpdated>;
  nftFixedFeeUpdated?: Maybe<NftFixedFeeUpdated>;
  nftFixedFeeUpdateds: Array<NftFixedFeeUpdated>;
  project?: Maybe<Project>;
  projectCooldownUpdated?: Maybe<ProjectCooldownUpdated>;
  projectCooldownUpdateds: Array<ProjectCooldownUpdated>;
  projectMember?: Maybe<ProjectMember>;
  projectMembers: Array<ProjectMember>;
  projectRemovePeriodUpdated?: Maybe<ProjectRemovePeriodUpdated>;
  projectRemovePeriodUpdateds: Array<ProjectRemovePeriodUpdated>;
  projects: Array<Project>;
  protocolFeeCollectorUpdated?: Maybe<ProtocolFeeCollectorUpdated>;
  protocolFeeCollectorUpdateds: Array<ProtocolFeeCollectorUpdated>;
  protocolFeeUpdated?: Maybe<ProtocolFeeUpdated>;
  protocolFeeUpdateds: Array<ProtocolFeeUpdated>;
  user?: Maybe<User>;
  userBalance?: Maybe<UserBalance>;
  userBalances: Array<UserBalance>;
  users: Array<User>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAttributorFeeUpdatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAttributorFeeUpdatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AttributorFeeUpdated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AttributorFeeUpdated_Filter>;
};


export type SubscriptionBudgetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBudgetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Budget_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Budget_Filter>;
};


export type SubscriptionClientFeeUpdatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionClientFeeUpdatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ClientFeeUpdated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ClientFeeUpdated_Filter>;
};


export type SubscriptionCurrencyAddedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCurrencyAddedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CurrencyAdded_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CurrencyAdded_Filter>;
};


export type SubscriptionCurrencyRemovedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCurrencyRemovedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CurrencyRemoved_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<CurrencyRemoved_Filter>;
};


export type SubscriptionNftFeeCurrencyUpdatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionNftFeeCurrencyUpdatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NftFeeCurrencyUpdated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NftFeeCurrencyUpdated_Filter>;
};


export type SubscriptionNftFixedFeeUpdatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionNftFixedFeeUpdatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NftFixedFeeUpdated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<NftFixedFeeUpdated_Filter>;
};


export type SubscriptionProjectArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProjectCooldownUpdatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProjectCooldownUpdatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProjectCooldownUpdated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProjectCooldownUpdated_Filter>;
};


export type SubscriptionProjectMemberArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProjectMembersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProjectMember_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProjectMember_Filter>;
};


export type SubscriptionProjectRemovePeriodUpdatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProjectRemovePeriodUpdatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProjectRemovePeriodUpdated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProjectRemovePeriodUpdated_Filter>;
};


export type SubscriptionProjectsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Project_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Project_Filter>;
};


export type SubscriptionProtocolFeeCollectorUpdatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProtocolFeeCollectorUpdatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProtocolFeeCollectorUpdated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProtocolFeeCollectorUpdated_Filter>;
};


export type SubscriptionProtocolFeeUpdatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProtocolFeeUpdatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProtocolFeeUpdated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProtocolFeeUpdated_Filter>;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUserBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUserBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserBalance_Filter>;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type User = {
  __typename?: 'User';
  address: Scalars['Bytes']['output'];
  balances?: Maybe<Array<UserBalance>>;
  id: Scalars['ID']['output'];
};


export type UserBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserBalance_Filter>;
};

export type UserBalance = {
  __typename?: 'UserBalance';
  availableToClaim: Scalars['BigInt']['output'];
  claimed: Scalars['BigInt']['output'];
  currency: Scalars['Bytes']['output'];
  id: Scalars['ID']['output'];
  owner: User;
  project: Project;
};

export type UserBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UserBalance_Filter>>>;
  availableToClaim?: InputMaybe<Scalars['BigInt']['input']>;
  availableToClaim_gt?: InputMaybe<Scalars['BigInt']['input']>;
  availableToClaim_gte?: InputMaybe<Scalars['BigInt']['input']>;
  availableToClaim_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  availableToClaim_lt?: InputMaybe<Scalars['BigInt']['input']>;
  availableToClaim_lte?: InputMaybe<Scalars['BigInt']['input']>;
  availableToClaim_not?: InputMaybe<Scalars['BigInt']['input']>;
  availableToClaim_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimed?: InputMaybe<Scalars['BigInt']['input']>;
  claimed_gt?: InputMaybe<Scalars['BigInt']['input']>;
  claimed_gte?: InputMaybe<Scalars['BigInt']['input']>;
  claimed_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimed_lt?: InputMaybe<Scalars['BigInt']['input']>;
  claimed_lte?: InputMaybe<Scalars['BigInt']['input']>;
  claimed_not?: InputMaybe<Scalars['BigInt']['input']>;
  claimed_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currency?: InputMaybe<Scalars['Bytes']['input']>;
  currency_contains?: InputMaybe<Scalars['Bytes']['input']>;
  currency_gt?: InputMaybe<Scalars['Bytes']['input']>;
  currency_gte?: InputMaybe<Scalars['Bytes']['input']>;
  currency_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  currency_lt?: InputMaybe<Scalars['Bytes']['input']>;
  currency_lte?: InputMaybe<Scalars['Bytes']['input']>;
  currency_not?: InputMaybe<Scalars['Bytes']['input']>;
  currency_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  currency_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<UserBalance_Filter>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_?: InputMaybe<User_Filter>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  project?: InputMaybe<Scalars['String']['input']>;
  project_?: InputMaybe<Project_Filter>;
  project_contains?: InputMaybe<Scalars['String']['input']>;
  project_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  project_ends_with?: InputMaybe<Scalars['String']['input']>;
  project_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  project_gt?: InputMaybe<Scalars['String']['input']>;
  project_gte?: InputMaybe<Scalars['String']['input']>;
  project_in?: InputMaybe<Array<Scalars['String']['input']>>;
  project_lt?: InputMaybe<Scalars['String']['input']>;
  project_lte?: InputMaybe<Scalars['String']['input']>;
  project_not?: InputMaybe<Scalars['String']['input']>;
  project_not_contains?: InputMaybe<Scalars['String']['input']>;
  project_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  project_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  project_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  project_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  project_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  project_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  project_starts_with?: InputMaybe<Scalars['String']['input']>;
  project_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum UserBalance_OrderBy {
  AvailableToClaim = 'availableToClaim',
  Claimed = 'claimed',
  Currency = 'currency',
  Id = 'id',
  Owner = 'owner',
  OwnerAddress = 'owner__address',
  OwnerId = 'owner__id',
  Project = 'project',
  ProjectClientFeeCollector = 'project__clientFeeCollector',
  ProjectDeployedAddress = 'project__deployedAddress',
  ProjectEventSigner = 'project__eventSigner',
  ProjectId = 'project__id',
  ProjectLastRemovalApplication = 'project__lastRemovalApplication',
  ProjectProjectId = 'project__projectId',
  ProjectProjectInfoUri = 'project__projectInfoURI'
}

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['Bytes']['input']>;
  address_not?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  balances_?: InputMaybe<UserBalance_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<User_Filter>>>;
};

export enum User_OrderBy {
  Address = 'address',
  Balances = 'balances',
  Id = 'id'
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

export type GetUserBalancesQueryVariables = Exact<{
  owner: Scalars['String']['input'];
  currency?: InputMaybe<Scalars['Bytes']['input']>;
  projectAddress?: InputMaybe<Scalars['Bytes']['input']>;
}>;


export type GetUserBalancesQuery = { __typename?: 'Query', userBalances: Array<{ __typename?: 'UserBalance', availableToClaim: any, claimed: any, currency: any, project: { __typename?: 'Project', id: string, deployedAddress: any } }> };


export const GetUserBalancesDocument = gql`
    query GetUserBalances($owner: String!, $currency: Bytes, $projectAddress: Bytes) {
  userBalances(
    where: {owner_contains_nocase: $owner, currency_contains: $currency, project_: {deployedAddress: $projectAddress}}
  ) {
    availableToClaim
    claimed
    currency
    project {
      id
      deployedAddress
    }
  }
}
    `;
export type GetUserBalancesQueryResult = Apollo.QueryResult<GetUserBalancesQuery, GetUserBalancesQueryVariables>;