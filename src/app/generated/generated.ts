import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AaveOracle
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const aaveOracleAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'provider',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
      { name: 'assets', internalType: 'address[]', type: 'address[]' },
      { name: 'sources', internalType: 'address[]', type: 'address[]' },
      { name: 'fallbackOracle', internalType: 'address', type: 'address' },
      { name: 'baseCurrency', internalType: 'address', type: 'address' },
      { name: 'baseCurrencyUnit', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'asset',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'source',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'AssetSourceUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'baseCurrency',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'baseCurrencyUnit',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BaseCurrencySet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fallbackOracle',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'FallbackOracleUpdated',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ADDRESSES_PROVIDER',
    outputs: [
      {
        name: '',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BASE_CURRENCY',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BASE_CURRENCY_UNIT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getAssetPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', internalType: 'address[]', type: 'address[]' }],
    name: 'getAssetsPrices',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getFallbackOracle',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getSourceOfAsset',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', internalType: 'address[]', type: 'address[]' },
      { name: 'sources', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'setAssetSources',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'fallbackOracle', internalType: 'address', type: 'address' },
    ],
    name: 'setFallbackOracle',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

export const aaveOracleAddress =
  '0xFDd4e83890BCcd1fbF9b10d71a5cc0a738753b01' as const

export const aaveOracleConfig = {
  address: aaveOracleAddress,
  abi: aaveOracleAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IncentiveDataProvider
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const incentiveDataProviderAbi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'provider',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'getFullReservesIncentiveData',
    outputs: [
      {
        name: '',
        internalType:
          'struct IUiIncentiveDataProviderV3.AggregatedReserveIncentiveData[]',
        type: 'tuple[]',
        components: [
          { name: 'underlyingAsset', internalType: 'address', type: 'address' },
          {
            name: 'aIncentiveData',
            internalType: 'struct IUiIncentiveDataProviderV3.IncentiveData',
            type: 'tuple',
            components: [
              {
                name: 'tokenAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'incentiveControllerAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'rewardsTokenInformation',
                internalType: 'struct IUiIncentiveDataProviderV3.RewardInfo[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'rewardTokenSymbol',
                    internalType: 'string',
                    type: 'string',
                  },
                  {
                    name: 'rewardTokenAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'rewardOracleAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'emissionPerSecond',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'incentivesLastUpdateTimestamp',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'tokenIncentivesIndex',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'emissionEndTimestamp',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'rewardPriceFeed',
                    internalType: 'int256',
                    type: 'int256',
                  },
                  {
                    name: 'rewardTokenDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                  { name: 'precision', internalType: 'uint8', type: 'uint8' },
                  {
                    name: 'priceFeedDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                ],
              },
            ],
          },
          {
            name: 'vIncentiveData',
            internalType: 'struct IUiIncentiveDataProviderV3.IncentiveData',
            type: 'tuple',
            components: [
              {
                name: 'tokenAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'incentiveControllerAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'rewardsTokenInformation',
                internalType: 'struct IUiIncentiveDataProviderV3.RewardInfo[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'rewardTokenSymbol',
                    internalType: 'string',
                    type: 'string',
                  },
                  {
                    name: 'rewardTokenAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'rewardOracleAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'emissionPerSecond',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'incentivesLastUpdateTimestamp',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'tokenIncentivesIndex',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'emissionEndTimestamp',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'rewardPriceFeed',
                    internalType: 'int256',
                    type: 'int256',
                  },
                  {
                    name: 'rewardTokenDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                  { name: 'precision', internalType: 'uint8', type: 'uint8' },
                  {
                    name: 'priceFeedDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                ],
              },
            ],
          },
          {
            name: 'sIncentiveData',
            internalType: 'struct IUiIncentiveDataProviderV3.IncentiveData',
            type: 'tuple',
            components: [
              {
                name: 'tokenAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'incentiveControllerAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'rewardsTokenInformation',
                internalType: 'struct IUiIncentiveDataProviderV3.RewardInfo[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'rewardTokenSymbol',
                    internalType: 'string',
                    type: 'string',
                  },
                  {
                    name: 'rewardTokenAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'rewardOracleAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'emissionPerSecond',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'incentivesLastUpdateTimestamp',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'tokenIncentivesIndex',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'emissionEndTimestamp',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'rewardPriceFeed',
                    internalType: 'int256',
                    type: 'int256',
                  },
                  {
                    name: 'rewardTokenDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                  { name: 'precision', internalType: 'uint8', type: 'uint8' },
                  {
                    name: 'priceFeedDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: '',
        internalType:
          'struct IUiIncentiveDataProviderV3.UserReserveIncentiveData[]',
        type: 'tuple[]',
        components: [
          { name: 'underlyingAsset', internalType: 'address', type: 'address' },
          {
            name: 'aTokenIncentivesUserData',
            internalType: 'struct IUiIncentiveDataProviderV3.UserIncentiveData',
            type: 'tuple',
            components: [
              {
                name: 'tokenAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'incentiveControllerAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'userRewardsInformation',
                internalType:
                  'struct IUiIncentiveDataProviderV3.UserRewardInfo[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'rewardTokenSymbol',
                    internalType: 'string',
                    type: 'string',
                  },
                  {
                    name: 'rewardOracleAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'rewardTokenAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'userUnclaimedRewards',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'tokenIncentivesUserIndex',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'rewardPriceFeed',
                    internalType: 'int256',
                    type: 'int256',
                  },
                  {
                    name: 'priceFeedDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                  {
                    name: 'rewardTokenDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                ],
              },
            ],
          },
          {
            name: 'vTokenIncentivesUserData',
            internalType: 'struct IUiIncentiveDataProviderV3.UserIncentiveData',
            type: 'tuple',
            components: [
              {
                name: 'tokenAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'incentiveControllerAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'userRewardsInformation',
                internalType:
                  'struct IUiIncentiveDataProviderV3.UserRewardInfo[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'rewardTokenSymbol',
                    internalType: 'string',
                    type: 'string',
                  },
                  {
                    name: 'rewardOracleAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'rewardTokenAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'userUnclaimedRewards',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'tokenIncentivesUserIndex',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'rewardPriceFeed',
                    internalType: 'int256',
                    type: 'int256',
                  },
                  {
                    name: 'priceFeedDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                  {
                    name: 'rewardTokenDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                ],
              },
            ],
          },
          {
            name: 'sTokenIncentivesUserData',
            internalType: 'struct IUiIncentiveDataProviderV3.UserIncentiveData',
            type: 'tuple',
            components: [
              {
                name: 'tokenAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'incentiveControllerAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'userRewardsInformation',
                internalType:
                  'struct IUiIncentiveDataProviderV3.UserRewardInfo[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'rewardTokenSymbol',
                    internalType: 'string',
                    type: 'string',
                  },
                  {
                    name: 'rewardOracleAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'rewardTokenAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'userUnclaimedRewards',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'tokenIncentivesUserIndex',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'rewardPriceFeed',
                    internalType: 'int256',
                    type: 'int256',
                  },
                  {
                    name: 'priceFeedDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                  {
                    name: 'rewardTokenDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'provider',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
    ],
    name: 'getReservesIncentivesData',
    outputs: [
      {
        name: '',
        internalType:
          'struct IUiIncentiveDataProviderV3.AggregatedReserveIncentiveData[]',
        type: 'tuple[]',
        components: [
          { name: 'underlyingAsset', internalType: 'address', type: 'address' },
          {
            name: 'aIncentiveData',
            internalType: 'struct IUiIncentiveDataProviderV3.IncentiveData',
            type: 'tuple',
            components: [
              {
                name: 'tokenAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'incentiveControllerAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'rewardsTokenInformation',
                internalType: 'struct IUiIncentiveDataProviderV3.RewardInfo[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'rewardTokenSymbol',
                    internalType: 'string',
                    type: 'string',
                  },
                  {
                    name: 'rewardTokenAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'rewardOracleAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'emissionPerSecond',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'incentivesLastUpdateTimestamp',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'tokenIncentivesIndex',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'emissionEndTimestamp',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'rewardPriceFeed',
                    internalType: 'int256',
                    type: 'int256',
                  },
                  {
                    name: 'rewardTokenDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                  { name: 'precision', internalType: 'uint8', type: 'uint8' },
                  {
                    name: 'priceFeedDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                ],
              },
            ],
          },
          {
            name: 'vIncentiveData',
            internalType: 'struct IUiIncentiveDataProviderV3.IncentiveData',
            type: 'tuple',
            components: [
              {
                name: 'tokenAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'incentiveControllerAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'rewardsTokenInformation',
                internalType: 'struct IUiIncentiveDataProviderV3.RewardInfo[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'rewardTokenSymbol',
                    internalType: 'string',
                    type: 'string',
                  },
                  {
                    name: 'rewardTokenAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'rewardOracleAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'emissionPerSecond',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'incentivesLastUpdateTimestamp',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'tokenIncentivesIndex',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'emissionEndTimestamp',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'rewardPriceFeed',
                    internalType: 'int256',
                    type: 'int256',
                  },
                  {
                    name: 'rewardTokenDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                  { name: 'precision', internalType: 'uint8', type: 'uint8' },
                  {
                    name: 'priceFeedDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                ],
              },
            ],
          },
          {
            name: 'sIncentiveData',
            internalType: 'struct IUiIncentiveDataProviderV3.IncentiveData',
            type: 'tuple',
            components: [
              {
                name: 'tokenAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'incentiveControllerAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'rewardsTokenInformation',
                internalType: 'struct IUiIncentiveDataProviderV3.RewardInfo[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'rewardTokenSymbol',
                    internalType: 'string',
                    type: 'string',
                  },
                  {
                    name: 'rewardTokenAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'rewardOracleAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'emissionPerSecond',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'incentivesLastUpdateTimestamp',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'tokenIncentivesIndex',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'emissionEndTimestamp',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'rewardPriceFeed',
                    internalType: 'int256',
                    type: 'int256',
                  },
                  {
                    name: 'rewardTokenDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                  { name: 'precision', internalType: 'uint8', type: 'uint8' },
                  {
                    name: 'priceFeedDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'provider',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'getUserReservesIncentivesData',
    outputs: [
      {
        name: '',
        internalType:
          'struct IUiIncentiveDataProviderV3.UserReserveIncentiveData[]',
        type: 'tuple[]',
        components: [
          { name: 'underlyingAsset', internalType: 'address', type: 'address' },
          {
            name: 'aTokenIncentivesUserData',
            internalType: 'struct IUiIncentiveDataProviderV3.UserIncentiveData',
            type: 'tuple',
            components: [
              {
                name: 'tokenAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'incentiveControllerAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'userRewardsInformation',
                internalType:
                  'struct IUiIncentiveDataProviderV3.UserRewardInfo[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'rewardTokenSymbol',
                    internalType: 'string',
                    type: 'string',
                  },
                  {
                    name: 'rewardOracleAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'rewardTokenAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'userUnclaimedRewards',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'tokenIncentivesUserIndex',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'rewardPriceFeed',
                    internalType: 'int256',
                    type: 'int256',
                  },
                  {
                    name: 'priceFeedDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                  {
                    name: 'rewardTokenDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                ],
              },
            ],
          },
          {
            name: 'vTokenIncentivesUserData',
            internalType: 'struct IUiIncentiveDataProviderV3.UserIncentiveData',
            type: 'tuple',
            components: [
              {
                name: 'tokenAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'incentiveControllerAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'userRewardsInformation',
                internalType:
                  'struct IUiIncentiveDataProviderV3.UserRewardInfo[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'rewardTokenSymbol',
                    internalType: 'string',
                    type: 'string',
                  },
                  {
                    name: 'rewardOracleAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'rewardTokenAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'userUnclaimedRewards',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'tokenIncentivesUserIndex',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'rewardPriceFeed',
                    internalType: 'int256',
                    type: 'int256',
                  },
                  {
                    name: 'priceFeedDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                  {
                    name: 'rewardTokenDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                ],
              },
            ],
          },
          {
            name: 'sTokenIncentivesUserData',
            internalType: 'struct IUiIncentiveDataProviderV3.UserIncentiveData',
            type: 'tuple',
            components: [
              {
                name: 'tokenAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'incentiveControllerAddress',
                internalType: 'address',
                type: 'address',
              },
              {
                name: 'userRewardsInformation',
                internalType:
                  'struct IUiIncentiveDataProviderV3.UserRewardInfo[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'rewardTokenSymbol',
                    internalType: 'string',
                    type: 'string',
                  },
                  {
                    name: 'rewardOracleAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'rewardTokenAddress',
                    internalType: 'address',
                    type: 'address',
                  },
                  {
                    name: 'userUnclaimedRewards',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'tokenIncentivesUserIndex',
                    internalType: 'uint256',
                    type: 'uint256',
                  },
                  {
                    name: 'rewardPriceFeed',
                    internalType: 'int256',
                    type: 'int256',
                  },
                  {
                    name: 'priceFeedDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                  {
                    name: 'rewardTokenDecimals',
                    internalType: 'uint8',
                    type: 'uint8',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
] as const

export const incentiveDataProviderAddress =
  '0x3F5a90eF7BC3eE64e1E95b850DbBC2469fF71ce8' as const

export const incentiveDataProviderConfig = {
  address: incentiveDataProviderAddress,
  abi: incentiveDataProviderAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LendingPool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lendingPoolAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'provider',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reserve',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'backer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BackUnbacked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reserve',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'user',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'onBehalfOf',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'interestRateMode',
        internalType: 'enum DataTypes.InterestRateMode',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'borrowRate',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'referralCode',
        internalType: 'uint16',
        type: 'uint16',
        indexed: true,
      },
    ],
    name: 'Borrow',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'target',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'initiator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'asset',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'interestRateMode',
        internalType: 'enum DataTypes.InterestRateMode',
        type: 'uint8',
        indexed: false,
      },
      {
        name: 'premium',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'referralCode',
        internalType: 'uint16',
        type: 'uint16',
        indexed: true,
      },
    ],
    name: 'FlashLoan',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'asset',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'totalDebt',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'IsolationModeTotalDebtUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'collateralAsset',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'debtAsset',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'debtToCover',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'liquidatedCollateralAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'liquidator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'receiveAToken',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'LiquidationCall',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reserve',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'user',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'onBehalfOf',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'referralCode',
        internalType: 'uint16',
        type: 'uint16',
        indexed: true,
      },
    ],
    name: 'MintUnbacked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reserve',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amountMinted',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MintedToTreasury',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reserve',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'RebalanceStableBorrowRate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reserve',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'repayer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'useATokens',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'Repay',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reserve',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'liquidityRate',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'stableBorrowRate',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'variableBorrowRate',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'liquidityIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'variableBorrowIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ReserveDataUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reserve',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'ReserveUsedAsCollateralDisabled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reserve',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'ReserveUsedAsCollateralEnabled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reserve',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'user',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'onBehalfOf',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'referralCode',
        internalType: 'uint16',
        type: 'uint16',
        indexed: true,
      },
    ],
    name: 'Supply',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reserve',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'interestRateMode',
        internalType: 'enum DataTypes.InterestRateMode',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'SwapBorrowRateMode',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'categoryId',
        internalType: 'uint8',
        type: 'uint8',
        indexed: false,
      },
    ],
    name: 'UserEModeSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reserve',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdraw',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ADDRESSES_PROVIDER',
    outputs: [
      {
        name: '',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BRIDGE_PROTOCOL_FEE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'FLASHLOAN_PREMIUM_TOTAL',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'FLASHLOAN_PREMIUM_TO_PROTOCOL',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_NUMBER_RESERVES',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_STABLE_RATE_BORROW_SIZE_PERCENT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'POOL_REVISION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'fee', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'backUnbacked',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'interestRateMode', internalType: 'uint256', type: 'uint256' },
      { name: 'referralCode', internalType: 'uint16', type: 'uint16' },
      { name: 'onBehalfOf', internalType: 'address', type: 'address' },
    ],
    name: 'borrow',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'args', internalType: 'bytes32', type: 'bytes32' }],
    name: 'borrow',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint8', type: 'uint8' },
      {
        name: 'category',
        internalType: 'struct DataTypes.EModeCategory',
        type: 'tuple',
        components: [
          { name: 'ltv', internalType: 'uint16', type: 'uint16' },
          {
            name: 'liquidationThreshold',
            internalType: 'uint16',
            type: 'uint16',
          },
          { name: 'liquidationBonus', internalType: 'uint16', type: 'uint16' },
          { name: 'priceSource', internalType: 'address', type: 'address' },
          { name: 'label', internalType: 'string', type: 'string' },
        ],
      },
    ],
    name: 'configureEModeCategory',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'onBehalfOf', internalType: 'address', type: 'address' },
      { name: 'referralCode', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'dropReserve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'balanceFromBefore', internalType: 'uint256', type: 'uint256' },
      { name: 'balanceToBefore', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'finalizeTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'receiverAddress', internalType: 'address', type: 'address' },
      { name: 'assets', internalType: 'address[]', type: 'address[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      {
        name: 'interestRateModes',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
      { name: 'onBehalfOf', internalType: 'address', type: 'address' },
      { name: 'params', internalType: 'bytes', type: 'bytes' },
      { name: 'referralCode', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'flashLoan',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'receiverAddress', internalType: 'address', type: 'address' },
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'params', internalType: 'bytes', type: 'bytes' },
      { name: 'referralCode', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'flashLoanSimple',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getConfiguration',
    outputs: [
      {
        name: '',
        internalType: 'struct DataTypes.ReserveConfigurationMap',
        type: 'tuple',
        components: [
          { name: 'data', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint8', type: 'uint8' }],
    name: 'getEModeCategoryData',
    outputs: [
      {
        name: '',
        internalType: 'struct DataTypes.EModeCategory',
        type: 'tuple',
        components: [
          { name: 'ltv', internalType: 'uint16', type: 'uint16' },
          {
            name: 'liquidationThreshold',
            internalType: 'uint16',
            type: 'uint16',
          },
          { name: 'liquidationBonus', internalType: 'uint16', type: 'uint16' },
          { name: 'priceSource', internalType: 'address', type: 'address' },
          { name: 'label', internalType: 'string', type: 'string' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint16', type: 'uint16' }],
    name: 'getReserveAddressById',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getReserveData',
    outputs: [
      {
        name: '',
        internalType: 'struct DataTypes.ReserveData',
        type: 'tuple',
        components: [
          {
            name: 'configuration',
            internalType: 'struct DataTypes.ReserveConfigurationMap',
            type: 'tuple',
            components: [
              { name: 'data', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'liquidityIndex', internalType: 'uint128', type: 'uint128' },
          {
            name: 'currentLiquidityRate',
            internalType: 'uint128',
            type: 'uint128',
          },
          {
            name: 'variableBorrowIndex',
            internalType: 'uint128',
            type: 'uint128',
          },
          {
            name: 'currentVariableBorrowRate',
            internalType: 'uint128',
            type: 'uint128',
          },
          {
            name: 'currentStableBorrowRate',
            internalType: 'uint128',
            type: 'uint128',
          },
          {
            name: 'lastUpdateTimestamp',
            internalType: 'uint40',
            type: 'uint40',
          },
          { name: 'id', internalType: 'uint16', type: 'uint16' },
          { name: 'aTokenAddress', internalType: 'address', type: 'address' },
          {
            name: 'stableDebtTokenAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'variableDebtTokenAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'interestRateStrategyAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'accruedToTreasury',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'unbacked', internalType: 'uint128', type: 'uint128' },
          {
            name: 'isolationModeTotalDebt',
            internalType: 'uint128',
            type: 'uint128',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getReserveNormalizedIncome',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getReserveNormalizedVariableDebt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getReservesList',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserAccountData',
    outputs: [
      { name: 'totalCollateralBase', internalType: 'uint256', type: 'uint256' },
      { name: 'totalDebtBase', internalType: 'uint256', type: 'uint256' },
      {
        name: 'availableBorrowsBase',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'currentLiquidationThreshold',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'ltv', internalType: 'uint256', type: 'uint256' },
      { name: 'healthFactor', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserConfiguration',
    outputs: [
      {
        name: '',
        internalType: 'struct DataTypes.UserConfigurationMap',
        type: 'tuple',
        components: [
          { name: 'data', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserEMode',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'aTokenAddress', internalType: 'address', type: 'address' },
      { name: 'stableDebtAddress', internalType: 'address', type: 'address' },
      { name: 'variableDebtAddress', internalType: 'address', type: 'address' },
      {
        name: 'interestRateStrategyAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'initReserve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'provider',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'collateralAsset', internalType: 'address', type: 'address' },
      { name: 'debtAsset', internalType: 'address', type: 'address' },
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'debtToCover', internalType: 'uint256', type: 'uint256' },
      { name: 'receiveAToken', internalType: 'bool', type: 'bool' },
    ],
    name: 'liquidationCall',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'args1', internalType: 'bytes32', type: 'bytes32' },
      { name: 'args2', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'liquidationCall',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', internalType: 'address[]', type: 'address[]' }],
    name: 'mintToTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'onBehalfOf', internalType: 'address', type: 'address' },
      { name: 'referralCode', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'mintUnbacked',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'args', internalType: 'bytes32', type: 'bytes32' }],
    name: 'rebalanceStableBorrowRate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'rebalanceStableBorrowRate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'args', internalType: 'bytes32', type: 'bytes32' }],
    name: 'repay',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'interestRateMode', internalType: 'uint256', type: 'uint256' },
      { name: 'onBehalfOf', internalType: 'address', type: 'address' },
    ],
    name: 'repay',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'interestRateMode', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'repayWithATokens',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'args', internalType: 'bytes32', type: 'bytes32' }],
    name: 'repayWithATokens',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'args', internalType: 'bytes32', type: 'bytes32' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'repayWithPermit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'interestRateMode', internalType: 'uint256', type: 'uint256' },
      { name: 'onBehalfOf', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'permitV', internalType: 'uint8', type: 'uint8' },
      { name: 'permitR', internalType: 'bytes32', type: 'bytes32' },
      { name: 'permitS', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'repayWithPermit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'rescueTokens',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'resetIsolationModeTotalDebt',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      {
        name: 'configuration',
        internalType: 'struct DataTypes.ReserveConfigurationMap',
        type: 'tuple',
        components: [
          { name: 'data', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'setConfiguration',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'rateStrategyAddress', internalType: 'address', type: 'address' },
    ],
    name: 'setReserveInterestRateStrategyAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'categoryId', internalType: 'uint8', type: 'uint8' }],
    name: 'setUserEMode',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'args', internalType: 'bytes32', type: 'bytes32' }],
    name: 'setUserUseReserveAsCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'useAsCollateral', internalType: 'bool', type: 'bool' },
    ],
    name: 'setUserUseReserveAsCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'onBehalfOf', internalType: 'address', type: 'address' },
      { name: 'referralCode', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'supply',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'args', internalType: 'bytes32', type: 'bytes32' }],
    name: 'supply',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'onBehalfOf', internalType: 'address', type: 'address' },
      { name: 'referralCode', internalType: 'uint16', type: 'uint16' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'permitV', internalType: 'uint8', type: 'uint8' },
      { name: 'permitR', internalType: 'bytes32', type: 'bytes32' },
      { name: 'permitS', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'supplyWithPermit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'args', internalType: 'bytes32', type: 'bytes32' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'supplyWithPermit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'args', internalType: 'bytes32', type: 'bytes32' }],
    name: 'swapBorrowRateMode',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'interestRateMode', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'swapBorrowRateMode',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'protocolFee', internalType: 'uint256', type: 'uint256' }],
    name: 'updateBridgeProtocolFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'flashLoanPremiumTotal',
        internalType: 'uint128',
        type: 'uint128',
      },
      {
        name: 'flashLoanPremiumToProtocol',
        internalType: 'uint128',
        type: 'uint128',
      },
    ],
    name: 'updateFlashloanPremiums',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
    name: 'withdraw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'args', internalType: 'bytes32', type: 'bytes32' }],
    name: 'withdraw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
] as const

export const lendingPoolAddress =
  '0x8F44Fd754285aa6A2b8B9B97739B79746e0475a7' as const

export const lendingPoolConfig = {
  address: lendingPoolAddress,
  abi: lendingPoolAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LoopStrategy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const loopStrategyAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_erc20name', internalType: 'string', type: 'string' },
      { name: '_erc20symbol', internalType: 'string', type: 'string' },
      { name: '_initialAdmin', internalType: 'address', type: 'address' },
      {
        name: '_strategyAssets',
        internalType: 'struct StrategyAssets',
        type: 'tuple',
        components: [
          {
            name: 'underlying',
            internalType: 'contract IERC20',
            type: 'address',
          },
          {
            name: 'collateral',
            internalType: 'contract IERC20',
            type: 'address',
          },
          { name: 'debt', internalType: 'contract IERC20', type: 'address' },
        ],
      },
      {
        name: '_collateralRatioTargets',
        internalType: 'struct CollateralRatio',
        type: 'tuple',
        components: [
          { name: 'target', internalType: 'uint256', type: 'uint256' },
          { name: 'minForRebalance', internalType: 'uint256', type: 'uint256' },
          { name: 'maxForRebalance', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minForWithdrawRebalance',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'maxForDepositRebalance',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
      {
        name: '_poolAddressProvider',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
      {
        name: '_oracle',
        internalType: 'contract IPriceOracleGetter',
        type: 'address',
      },
      { name: '_swapper', internalType: 'contract ISwapper', type: 'address' },
      { name: '_ratioMargin', internalType: 'uint256', type: 'uint256' },
      { name: '_maxIterations', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'LoopStrategy_init',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MANAGER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PAUSER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'asset',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'collateralUSD',
    outputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    name: 'convertToAssets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    name: 'convertToShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'currentCollateralRatio',
    outputs: [{ name: 'ratio', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'debtUSD',
    outputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'deposit',
    outputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'minSharesReceived', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'deposit',
    outputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'equity',
    outputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'equityUSD',
    outputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAssets',
    outputs: [
      {
        name: 'assets',
        internalType: 'struct StrategyAssets',
        type: 'tuple',
        components: [
          {
            name: 'underlying',
            internalType: 'contract IERC20',
            type: 'address',
          },
          {
            name: 'collateral',
            internalType: 'contract IERC20',
            type: 'address',
          },
          { name: 'debt', internalType: 'contract IERC20', type: 'address' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAssetsCap',
    outputs: [{ name: 'assetsCap', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCollateralRatioTargets',
    outputs: [
      {
        name: 'ratio',
        internalType: 'struct CollateralRatio',
        type: 'tuple',
        components: [
          { name: 'target', internalType: 'uint256', type: 'uint256' },
          { name: 'minForRebalance', internalType: 'uint256', type: 'uint256' },
          { name: 'maxForRebalance', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minForWithdrawRebalance',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'maxForDepositRebalance',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLendingPool',
    outputs: [
      {
        name: 'pool',
        internalType: 'struct LendingPool',
        type: 'tuple',
        components: [
          { name: 'pool', internalType: 'contract IPool', type: 'address' },
          {
            name: 'interestRateMode',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'sTokenCollateral',
            internalType: 'contract IAToken',
            type: 'address',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMaxIterations',
    outputs: [{ name: 'iterations', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMaxSlippageOnRebalance',
    outputs: [
      { name: 'maxslippage', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getOracle',
    outputs: [{ name: 'oracle', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPoolAddressProvider',
    outputs: [
      { name: 'poolAddressProvider', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRatioMargin',
    outputs: [{ name: 'marginUSD', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getSwapper',
    outputs: [{ name: 'swapper', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'maxDeposit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'maxMint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'maxRedeem',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'maxWithdraw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    name: 'previewDeposit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'previewMint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    name: 'previewRedeem',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'previewWithdraw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rebalance',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rebalanceNeeded',
    outputs: [{ name: 'shouldRebalance', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'shares', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'minUnderlyingAsset', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'redeem',
    outputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'shares', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'redeem',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'assetsCap', internalType: 'uint256', type: 'uint256' }],
    name: 'setAssetsCap',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'targets',
        internalType: 'struct CollateralRatio',
        type: 'tuple',
        components: [
          { name: 'target', internalType: 'uint256', type: 'uint256' },
          { name: 'minForRebalance', internalType: 'uint256', type: 'uint256' },
          { name: 'maxForRebalance', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minForWithdrawRebalance',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'maxForDepositRebalance',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    name: 'setCollateralRatioTargets',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_interestRateMode', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setInterestRateMode',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'iterations', internalType: 'uint16', type: 'uint16' }],
    name: 'setMaxIterations',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'maxSlippage', internalType: 'uint256', type: 'uint256' }],
    name: 'setMaxSlippageOnRebalance',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'marginUSD', internalType: 'uint256', type: 'uint256' }],
    name: 'setRatioMargin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'swapper', internalType: 'address', type: 'address' }],
    name: 'setSwapper',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalAssets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'withdraw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'assetsCap',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AssetsCapSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'targets',
        internalType: 'struct CollateralRatio',
        type: 'tuple',
        components: [
          { name: 'target', internalType: 'uint256', type: 'uint256' },
          { name: 'minForRebalance', internalType: 'uint256', type: 'uint256' },
          { name: 'maxForRebalance', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minForWithdrawRebalance',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'maxForDepositRebalance',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
        indexed: false,
      },
    ],
    name: 'CollateralRatioTargetsSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'assets',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'shares',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'iterations',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
    ],
    name: 'MaxIterationsSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'maxSlippage',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MaxSlippageOnRebalanceSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'margin',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RatioMarginSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'swapper',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'SwapperSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'margin',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'USDMarginSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'receiver',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'assets',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'shares',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdraw',
  },
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'assets', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC4626ExceededMaxDeposit',
  },
  {
    type: 'error',
    inputs: [
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'shares', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC4626ExceededMaxMint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'shares', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC4626ExceededMaxRedeem',
  },
  {
    type: 'error',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'assets', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC4626ExceededMaxWithdraw',
  },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InvalidCollateralRatioTargets' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'MarginOutsideRange' },
  { type: 'error', inputs: [], name: 'MathOverflowedMulDiv' },
  { type: 'error', inputs: [], name: 'MaxSlippageOutOfRange' },
  { type: 'error', inputs: [], name: 'MintDisabled' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'RebalanceNotNeeded' },
  { type: 'error', inputs: [], name: 'RedeemerNotOwner' },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sharesReceived', internalType: 'uint256', type: 'uint256' },
      { name: 'minSharesReceived', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SharesReceivedBelowMinimum',
  },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
  {
    type: 'error',
    inputs: [
      { name: 'underlyingReceived', internalType: 'uint256', type: 'uint256' },
      {
        name: 'minUnderlyingReceived',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'UnderlyingReceivedBelowMinimum',
  },
  { type: 'error', inputs: [], name: 'WithdrawDisabled' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PoolDataProvider
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const poolDataProviderAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_networkBaseTokenPriceInUsdProxyAggregator',
        internalType: 'contract IEACAggregatorProxy',
        type: 'address',
      },
      {
        name: '_marketReferenceCurrencyPriceInUsdProxyAggregator',
        internalType: 'contract IEACAggregatorProxy',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ETH_CURRENCY_UNIT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MKR_ADDRESS',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_bytes32', internalType: 'bytes32', type: 'bytes32' }],
    name: 'bytes32ToString',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'provider',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
    ],
    name: 'getReservesData',
    outputs: [
      {
        name: '',
        internalType: 'struct IUiPoolDataProviderV3.AggregatedReserveData[]',
        type: 'tuple[]',
        components: [
          { name: 'underlyingAsset', internalType: 'address', type: 'address' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'symbol', internalType: 'string', type: 'string' },
          { name: 'decimals', internalType: 'uint256', type: 'uint256' },
          {
            name: 'baseLTVasCollateral',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'reserveLiquidationThreshold',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'reserveLiquidationBonus',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'reserveFactor', internalType: 'uint256', type: 'uint256' },
          {
            name: 'usageAsCollateralEnabled',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'borrowingEnabled', internalType: 'bool', type: 'bool' },
          {
            name: 'stableBorrowRateEnabled',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'isActive', internalType: 'bool', type: 'bool' },
          { name: 'isFrozen', internalType: 'bool', type: 'bool' },
          { name: 'liquidityIndex', internalType: 'uint128', type: 'uint128' },
          {
            name: 'variableBorrowIndex',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'liquidityRate', internalType: 'uint128', type: 'uint128' },
          {
            name: 'variableBorrowRate',
            internalType: 'uint128',
            type: 'uint128',
          },
          {
            name: 'stableBorrowRate',
            internalType: 'uint128',
            type: 'uint128',
          },
          {
            name: 'lastUpdateTimestamp',
            internalType: 'uint40',
            type: 'uint40',
          },
          { name: 'aTokenAddress', internalType: 'address', type: 'address' },
          {
            name: 'stableDebtTokenAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'variableDebtTokenAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'interestRateStrategyAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'availableLiquidity',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'totalPrincipalStableDebt',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'averageStableRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'stableDebtLastUpdateTimestamp',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'totalScaledVariableDebt',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'priceInMarketReferenceCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'priceOracle', internalType: 'address', type: 'address' },
          {
            name: 'variableRateSlope1',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'variableRateSlope2',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'stableRateSlope1',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'stableRateSlope2',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'baseStableBorrowRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'baseVariableBorrowRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'optimalUsageRatio',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'isPaused', internalType: 'bool', type: 'bool' },
          { name: 'isSiloedBorrowing', internalType: 'bool', type: 'bool' },
          {
            name: 'accruedToTreasury',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'unbacked', internalType: 'uint128', type: 'uint128' },
          {
            name: 'isolationModeTotalDebt',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'flashLoanEnabled', internalType: 'bool', type: 'bool' },
          { name: 'debtCeiling', internalType: 'uint256', type: 'uint256' },
          {
            name: 'debtCeilingDecimals',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'eModeCategoryId', internalType: 'uint8', type: 'uint8' },
          { name: 'borrowCap', internalType: 'uint256', type: 'uint256' },
          { name: 'supplyCap', internalType: 'uint256', type: 'uint256' },
          { name: 'eModeLtv', internalType: 'uint16', type: 'uint16' },
          {
            name: 'eModeLiquidationThreshold',
            internalType: 'uint16',
            type: 'uint16',
          },
          {
            name: 'eModeLiquidationBonus',
            internalType: 'uint16',
            type: 'uint16',
          },
          {
            name: 'eModePriceSource',
            internalType: 'address',
            type: 'address',
          },
          { name: 'eModeLabel', internalType: 'string', type: 'string' },
          { name: 'borrowableInIsolation', internalType: 'bool', type: 'bool' },
        ],
      },
      {
        name: '',
        internalType: 'struct IUiPoolDataProviderV3.BaseCurrencyInfo',
        type: 'tuple',
        components: [
          {
            name: 'marketReferenceCurrencyUnit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'marketReferenceCurrencyPriceInUsd',
            internalType: 'int256',
            type: 'int256',
          },
          {
            name: 'networkBaseTokenPriceInUsd',
            internalType: 'int256',
            type: 'int256',
          },
          {
            name: 'networkBaseTokenPriceDecimals',
            internalType: 'uint8',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'provider',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
    ],
    name: 'getReservesList',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'provider',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'getUserReservesData',
    outputs: [
      {
        name: '',
        internalType: 'struct IUiPoolDataProviderV3.UserReserveData[]',
        type: 'tuple[]',
        components: [
          { name: 'underlyingAsset', internalType: 'address', type: 'address' },
          {
            name: 'scaledATokenBalance',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'usageAsCollateralEnabledOnUser',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'stableBorrowRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'scaledVariableDebt',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'principalStableDebt',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'stableBorrowLastUpdateTimestamp',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
      { name: '', internalType: 'uint8', type: 'uint8' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'marketReferenceCurrencyPriceInUsdProxyAggregator',
    outputs: [
      {
        name: '',
        internalType: 'contract IEACAggregatorProxy',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'networkBaseTokenPriceInUsdProxyAggregator',
    outputs: [
      {
        name: '',
        internalType: 'contract IEACAggregatorProxy',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
] as const

export const poolDataProviderAddress =
  '0xB7397f841a449793c634C06Cf12751d256b9bf50' as const

export const poolDataProviderConfig = {
  address: poolDataProviderAddress,
  abi: poolDataProviderAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ProtocolDataProvider
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const protocolDataProviderAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'addressesProvider',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ADDRESSES_PROVIDER',
    outputs: [
      {
        name: '',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getATokenTotalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllATokens',
    outputs: [
      {
        name: '',
        internalType: 'struct IPoolDataProvider.TokenData[]',
        type: 'tuple[]',
        components: [
          { name: 'symbol', internalType: 'string', type: 'string' },
          { name: 'tokenAddress', internalType: 'address', type: 'address' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllReservesTokens',
    outputs: [
      {
        name: '',
        internalType: 'struct IPoolDataProvider.TokenData[]',
        type: 'tuple[]',
        components: [
          { name: 'symbol', internalType: 'string', type: 'string' },
          { name: 'tokenAddress', internalType: 'address', type: 'address' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getDebtCeiling',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getDebtCeilingDecimals',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getFlashLoanEnabled',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getInterestRateStrategyAddress',
    outputs: [
      { name: 'irStrategyAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getLiquidationProtocolFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getPaused',
    outputs: [{ name: 'isPaused', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getReserveCaps',
    outputs: [
      { name: 'borrowCap', internalType: 'uint256', type: 'uint256' },
      { name: 'supplyCap', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getReserveConfigurationData',
    outputs: [
      { name: 'decimals', internalType: 'uint256', type: 'uint256' },
      { name: 'ltv', internalType: 'uint256', type: 'uint256' },
      {
        name: 'liquidationThreshold',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'liquidationBonus', internalType: 'uint256', type: 'uint256' },
      { name: 'reserveFactor', internalType: 'uint256', type: 'uint256' },
      { name: 'usageAsCollateralEnabled', internalType: 'bool', type: 'bool' },
      { name: 'borrowingEnabled', internalType: 'bool', type: 'bool' },
      { name: 'stableBorrowRateEnabled', internalType: 'bool', type: 'bool' },
      { name: 'isActive', internalType: 'bool', type: 'bool' },
      { name: 'isFrozen', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getReserveData',
    outputs: [
      { name: 'unbacked', internalType: 'uint256', type: 'uint256' },
      {
        name: 'accruedToTreasuryScaled',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'totalAToken', internalType: 'uint256', type: 'uint256' },
      { name: 'totalStableDebt', internalType: 'uint256', type: 'uint256' },
      { name: 'totalVariableDebt', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidityRate', internalType: 'uint256', type: 'uint256' },
      { name: 'variableBorrowRate', internalType: 'uint256', type: 'uint256' },
      { name: 'stableBorrowRate', internalType: 'uint256', type: 'uint256' },
      {
        name: 'averageStableBorrowRate',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'liquidityIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'variableBorrowIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'lastUpdateTimestamp', internalType: 'uint40', type: 'uint40' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getReserveEModeCategory',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getReserveTokensAddresses',
    outputs: [
      { name: 'aTokenAddress', internalType: 'address', type: 'address' },
      {
        name: 'stableDebtTokenAddress',
        internalType: 'address',
        type: 'address',
      },
      {
        name: 'variableDebtTokenAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getSiloedBorrowing',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getTotalDebt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getUnbackedMintCap',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'getUserReserveData',
    outputs: [
      {
        name: 'currentATokenBalance',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'currentStableDebt', internalType: 'uint256', type: 'uint256' },
      { name: 'currentVariableDebt', internalType: 'uint256', type: 'uint256' },
      { name: 'principalStableDebt', internalType: 'uint256', type: 'uint256' },
      { name: 'scaledVariableDebt', internalType: 'uint256', type: 'uint256' },
      { name: 'stableBorrowRate', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidityRate', internalType: 'uint256', type: 'uint256' },
      { name: 'stableRateLastUpdated', internalType: 'uint40', type: 'uint40' },
      { name: 'usageAsCollateralEnabled', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
] as const

export const protocolDataProviderAddress =
  '0x2A0979257105834789bC6b9E1B00446DFbA8dFBa' as const

export const protocolDataProviderConfig = {
  address: protocolDataProviderAddress,
  abi: protocolDataProviderAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RewardsController
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const rewardsControllerAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'emissionManager', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'asset',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'reward',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'assetIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'userIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'rewardsAccrued',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Accrued',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'asset',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'reward',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'oldUserIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'oldRewardsAccrued',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newUserIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newRewardsAccrued',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AccruedIndexChange',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'asset',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'reward',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'oldEmission',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newEmission',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'oldDistributionEnd',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newDistributionEnd',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'assetIndex',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AssetConfigUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'claimer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ClaimerSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reward',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'rewardOracle',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RewardOracleUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'reward',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'claimer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardsClaimed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TemporaryOverrideAdminSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reward',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'transferStrategy',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TransferStrategyInstalled',
  },
  {
    type: 'function',
    inputs: [],
    name: 'EMISSION_MANAGER',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'REVISION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', internalType: 'address[]', type: 'address[]' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
    name: 'claimAllRewards',
    outputs: [
      { name: 'rewardsList', internalType: 'address[]', type: 'address[]' },
      { name: 'claimedAmounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', internalType: 'address[]', type: 'address[]' },
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
    name: 'claimAllRewardsOnBehalf',
    outputs: [
      { name: 'rewardsList', internalType: 'address[]', type: 'address[]' },
      { name: 'claimedAmounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', internalType: 'address[]', type: 'address[]' }],
    name: 'claimAllRewardsToSelf',
    outputs: [
      { name: 'rewardsList', internalType: 'address[]', type: 'address[]' },
      { name: 'claimedAmounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', internalType: 'address[]', type: 'address[]' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'reward', internalType: 'address', type: 'address' },
    ],
    name: 'claimRewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', internalType: 'address[]', type: 'address[]' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'reward', internalType: 'address', type: 'address' },
    ],
    name: 'claimRewardsOnBehalf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', internalType: 'address[]', type: 'address[]' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'reward', internalType: 'address', type: 'address' },
    ],
    name: 'claimRewardsToSelf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'config',
        internalType: 'struct RewardsDataTypes.RewardsConfigInput[]',
        type: 'tuple[]',
        components: [
          { name: 'emissionPerSecond', internalType: 'uint88', type: 'uint88' },
          { name: 'totalSupply', internalType: 'uint256', type: 'uint256' },
          { name: 'distributionEnd', internalType: 'uint32', type: 'uint32' },
          { name: 'asset', internalType: 'address', type: 'address' },
          { name: 'reward', internalType: 'address', type: 'address' },
          {
            name: 'transferStrategy',
            internalType: 'contract ITransferStrategyBase',
            type: 'address',
          },
          {
            name: 'rewardOracle',
            internalType: 'contract IEACAggregatorProxy',
            type: 'address',
          },
        ],
      },
    ],
    name: 'configureAssets',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', internalType: 'address[]', type: 'address[]' },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'getAllUserRewards',
    outputs: [
      { name: 'rewardsList', internalType: 'address[]', type: 'address[]' },
      {
        name: 'unclaimedAmounts',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getAssetDecimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'reward', internalType: 'address', type: 'address' },
    ],
    name: 'getAssetIndex',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getClaimer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'reward', internalType: 'address', type: 'address' },
    ],
    name: 'getDistributionEnd',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getEmissionManager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'reward', internalType: 'address', type: 'address' }],
    name: 'getRewardOracle',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getRewardsByAsset',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'reward', internalType: 'address', type: 'address' },
    ],
    name: 'getRewardsData',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRewardsList',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'reward', internalType: 'address', type: 'address' }],
    name: 'getTransferStrategy',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'reward', internalType: 'address', type: 'address' },
    ],
    name: 'getUserAccruedRewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'reward', internalType: 'address', type: 'address' },
    ],
    name: 'getUserAssetIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', internalType: 'address[]', type: 'address[]' },
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'reward', internalType: 'address', type: 'address' },
    ],
    name: 'getUserRewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'totalSupply', internalType: 'uint256', type: 'uint256' },
      { name: 'userBalance', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'handleAction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceTemporaryOverrideAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'caller', internalType: 'address', type: 'address' },
    ],
    name: 'setClaimer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'reward', internalType: 'address', type: 'address' },
      { name: 'newDistributionEnd', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'setDistributionEnd',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'rewards', internalType: 'address[]', type: 'address[]' },
      {
        name: 'newEmissionsPerSecond',
        internalType: 'uint88[]',
        type: 'uint88[]',
      },
    ],
    name: 'setEmissionPerSecond',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'reward', internalType: 'address', type: 'address' },
      {
        name: 'rewardOracle',
        internalType: 'contract IEACAggregatorProxy',
        type: 'address',
      },
    ],
    name: 'setRewardOracle',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'reward', internalType: 'address', type: 'address' },
      {
        name: 'transferStrategy',
        internalType: 'contract ITransferStrategyBase',
        type: 'address',
      },
    ],
    name: 'setTransferStrategy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', internalType: 'address[]', type: 'address[]' },
      { name: 'rewards', internalType: 'address[]', type: 'address[]' },
      { name: 'users', internalType: 'address[]', type: 'address[]' },
      { name: 'indexes', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'accruedAmounts', internalType: 'uint128[]', type: 'uint128[]' },
    ],
    name: 'setUserData',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'temporaryOverrideAdmin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
] as const

export const rewardsControllerAddress =
  '0x91Ac2FfF8CBeF5859eAA6DdA661feBd533cD3780' as const

export const rewardsControllerConfig = {
  address: rewardsControllerAddress,
  abi: rewardsControllerAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveOracleAbi}__
 */
export const useReadAaveOracle = /*#__PURE__*/ createUseReadContract({
  abi: aaveOracleAbi,
  address: aaveOracleAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveOracleAbi}__ and `functionName` set to `"ADDRESSES_PROVIDER"`
 */
export const useReadAaveOracleAddressesProvider =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveOracleAbi,
    address: aaveOracleAddress,
    functionName: 'ADDRESSES_PROVIDER',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveOracleAbi}__ and `functionName` set to `"BASE_CURRENCY"`
 */
export const useReadAaveOracleBaseCurrency =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveOracleAbi,
    address: aaveOracleAddress,
    functionName: 'BASE_CURRENCY',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveOracleAbi}__ and `functionName` set to `"BASE_CURRENCY_UNIT"`
 */
export const useReadAaveOracleBaseCurrencyUnit =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveOracleAbi,
    address: aaveOracleAddress,
    functionName: 'BASE_CURRENCY_UNIT',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveOracleAbi}__ and `functionName` set to `"getAssetPrice"`
 */
export const useReadAaveOracleGetAssetPrice =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveOracleAbi,
    address: aaveOracleAddress,
    functionName: 'getAssetPrice',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveOracleAbi}__ and `functionName` set to `"getAssetsPrices"`
 */
export const useReadAaveOracleGetAssetsPrices =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveOracleAbi,
    address: aaveOracleAddress,
    functionName: 'getAssetsPrices',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveOracleAbi}__ and `functionName` set to `"getFallbackOracle"`
 */
export const useReadAaveOracleGetFallbackOracle =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveOracleAbi,
    address: aaveOracleAddress,
    functionName: 'getFallbackOracle',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveOracleAbi}__ and `functionName` set to `"getSourceOfAsset"`
 */
export const useReadAaveOracleGetSourceOfAsset =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveOracleAbi,
    address: aaveOracleAddress,
    functionName: 'getSourceOfAsset',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aaveOracleAbi}__
 */
export const useWriteAaveOracle = /*#__PURE__*/ createUseWriteContract({
  abi: aaveOracleAbi,
  address: aaveOracleAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aaveOracleAbi}__ and `functionName` set to `"setAssetSources"`
 */
export const useWriteAaveOracleSetAssetSources =
  /*#__PURE__*/ createUseWriteContract({
    abi: aaveOracleAbi,
    address: aaveOracleAddress,
    functionName: 'setAssetSources',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aaveOracleAbi}__ and `functionName` set to `"setFallbackOracle"`
 */
export const useWriteAaveOracleSetFallbackOracle =
  /*#__PURE__*/ createUseWriteContract({
    abi: aaveOracleAbi,
    address: aaveOracleAddress,
    functionName: 'setFallbackOracle',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aaveOracleAbi}__
 */
export const useSimulateAaveOracle = /*#__PURE__*/ createUseSimulateContract({
  abi: aaveOracleAbi,
  address: aaveOracleAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aaveOracleAbi}__ and `functionName` set to `"setAssetSources"`
 */
export const useSimulateAaveOracleSetAssetSources =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aaveOracleAbi,
    address: aaveOracleAddress,
    functionName: 'setAssetSources',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aaveOracleAbi}__ and `functionName` set to `"setFallbackOracle"`
 */
export const useSimulateAaveOracleSetFallbackOracle =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aaveOracleAbi,
    address: aaveOracleAddress,
    functionName: 'setFallbackOracle',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aaveOracleAbi}__
 */
export const useWatchAaveOracleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: aaveOracleAbi,
    address: aaveOracleAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aaveOracleAbi}__ and `eventName` set to `"AssetSourceUpdated"`
 */
export const useWatchAaveOracleAssetSourceUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: aaveOracleAbi,
    address: aaveOracleAddress,
    eventName: 'AssetSourceUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aaveOracleAbi}__ and `eventName` set to `"BaseCurrencySet"`
 */
export const useWatchAaveOracleBaseCurrencySetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: aaveOracleAbi,
    address: aaveOracleAddress,
    eventName: 'BaseCurrencySet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aaveOracleAbi}__ and `eventName` set to `"FallbackOracleUpdated"`
 */
export const useWatchAaveOracleFallbackOracleUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: aaveOracleAbi,
    address: aaveOracleAddress,
    eventName: 'FallbackOracleUpdated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link incentiveDataProviderAbi}__
 */
export const useReadIncentiveDataProvider = /*#__PURE__*/ createUseReadContract(
  { abi: incentiveDataProviderAbi, address: incentiveDataProviderAddress },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link incentiveDataProviderAbi}__ and `functionName` set to `"getFullReservesIncentiveData"`
 */
export const useReadIncentiveDataProviderGetFullReservesIncentiveData =
  /*#__PURE__*/ createUseReadContract({
    abi: incentiveDataProviderAbi,
    address: incentiveDataProviderAddress,
    functionName: 'getFullReservesIncentiveData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link incentiveDataProviderAbi}__ and `functionName` set to `"getReservesIncentivesData"`
 */
export const useReadIncentiveDataProviderGetReservesIncentivesData =
  /*#__PURE__*/ createUseReadContract({
    abi: incentiveDataProviderAbi,
    address: incentiveDataProviderAddress,
    functionName: 'getReservesIncentivesData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link incentiveDataProviderAbi}__ and `functionName` set to `"getUserReservesIncentivesData"`
 */
export const useReadIncentiveDataProviderGetUserReservesIncentivesData =
  /*#__PURE__*/ createUseReadContract({
    abi: incentiveDataProviderAbi,
    address: incentiveDataProviderAddress,
    functionName: 'getUserReservesIncentivesData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__
 */
export const useReadLendingPool = /*#__PURE__*/ createUseReadContract({
  abi: lendingPoolAbi,
  address: lendingPoolAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"ADDRESSES_PROVIDER"`
 */
export const useReadLendingPoolAddressesProvider =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'ADDRESSES_PROVIDER',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"BRIDGE_PROTOCOL_FEE"`
 */
export const useReadLendingPoolBridgeProtocolFee =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'BRIDGE_PROTOCOL_FEE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"FLASHLOAN_PREMIUM_TOTAL"`
 */
export const useReadLendingPoolFlashloanPremiumTotal =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'FLASHLOAN_PREMIUM_TOTAL',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"FLASHLOAN_PREMIUM_TO_PROTOCOL"`
 */
export const useReadLendingPoolFlashloanPremiumToProtocol =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'FLASHLOAN_PREMIUM_TO_PROTOCOL',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"MAX_NUMBER_RESERVES"`
 */
export const useReadLendingPoolMaxNumberReserves =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'MAX_NUMBER_RESERVES',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"MAX_STABLE_RATE_BORROW_SIZE_PERCENT"`
 */
export const useReadLendingPoolMaxStableRateBorrowSizePercent =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'MAX_STABLE_RATE_BORROW_SIZE_PERCENT',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"POOL_REVISION"`
 */
export const useReadLendingPoolPoolRevision =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'POOL_REVISION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"getConfiguration"`
 */
export const useReadLendingPoolGetConfiguration =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'getConfiguration',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"getEModeCategoryData"`
 */
export const useReadLendingPoolGetEModeCategoryData =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'getEModeCategoryData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"getReserveAddressById"`
 */
export const useReadLendingPoolGetReserveAddressById =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'getReserveAddressById',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"getReserveData"`
 */
export const useReadLendingPoolGetReserveData =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'getReserveData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"getReserveNormalizedIncome"`
 */
export const useReadLendingPoolGetReserveNormalizedIncome =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'getReserveNormalizedIncome',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"getReserveNormalizedVariableDebt"`
 */
export const useReadLendingPoolGetReserveNormalizedVariableDebt =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'getReserveNormalizedVariableDebt',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"getReservesList"`
 */
export const useReadLendingPoolGetReservesList =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'getReservesList',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"getUserAccountData"`
 */
export const useReadLendingPoolGetUserAccountData =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'getUserAccountData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"getUserConfiguration"`
 */
export const useReadLendingPoolGetUserConfiguration =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'getUserConfiguration',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"getUserEMode"`
 */
export const useReadLendingPoolGetUserEMode =
  /*#__PURE__*/ createUseReadContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'getUserEMode',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__
 */
export const useWriteLendingPool = /*#__PURE__*/ createUseWriteContract({
  abi: lendingPoolAbi,
  address: lendingPoolAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"backUnbacked"`
 */
export const useWriteLendingPoolBackUnbacked =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'backUnbacked',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"borrow"`
 */
export const useWriteLendingPoolBorrow = /*#__PURE__*/ createUseWriteContract({
  abi: lendingPoolAbi,
  address: lendingPoolAddress,
  functionName: 'borrow',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"configureEModeCategory"`
 */
export const useWriteLendingPoolConfigureEModeCategory =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'configureEModeCategory',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteLendingPoolDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: lendingPoolAbi,
  address: lendingPoolAddress,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"dropReserve"`
 */
export const useWriteLendingPoolDropReserve =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'dropReserve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"finalizeTransfer"`
 */
export const useWriteLendingPoolFinalizeTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'finalizeTransfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"flashLoan"`
 */
export const useWriteLendingPoolFlashLoan =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'flashLoan',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"flashLoanSimple"`
 */
export const useWriteLendingPoolFlashLoanSimple =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'flashLoanSimple',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"initReserve"`
 */
export const useWriteLendingPoolInitReserve =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'initReserve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteLendingPoolInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"liquidationCall"`
 */
export const useWriteLendingPoolLiquidationCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'liquidationCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"mintToTreasury"`
 */
export const useWriteLendingPoolMintToTreasury =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'mintToTreasury',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"mintUnbacked"`
 */
export const useWriteLendingPoolMintUnbacked =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'mintUnbacked',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"rebalanceStableBorrowRate"`
 */
export const useWriteLendingPoolRebalanceStableBorrowRate =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'rebalanceStableBorrowRate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"repay"`
 */
export const useWriteLendingPoolRepay = /*#__PURE__*/ createUseWriteContract({
  abi: lendingPoolAbi,
  address: lendingPoolAddress,
  functionName: 'repay',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"repayWithATokens"`
 */
export const useWriteLendingPoolRepayWithATokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'repayWithATokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"repayWithPermit"`
 */
export const useWriteLendingPoolRepayWithPermit =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'repayWithPermit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"rescueTokens"`
 */
export const useWriteLendingPoolRescueTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'rescueTokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"resetIsolationModeTotalDebt"`
 */
export const useWriteLendingPoolResetIsolationModeTotalDebt =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'resetIsolationModeTotalDebt',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"setConfiguration"`
 */
export const useWriteLendingPoolSetConfiguration =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'setConfiguration',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"setReserveInterestRateStrategyAddress"`
 */
export const useWriteLendingPoolSetReserveInterestRateStrategyAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'setReserveInterestRateStrategyAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"setUserEMode"`
 */
export const useWriteLendingPoolSetUserEMode =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'setUserEMode',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"setUserUseReserveAsCollateral"`
 */
export const useWriteLendingPoolSetUserUseReserveAsCollateral =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'setUserUseReserveAsCollateral',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"supply"`
 */
export const useWriteLendingPoolSupply = /*#__PURE__*/ createUseWriteContract({
  abi: lendingPoolAbi,
  address: lendingPoolAddress,
  functionName: 'supply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"supplyWithPermit"`
 */
export const useWriteLendingPoolSupplyWithPermit =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'supplyWithPermit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"swapBorrowRateMode"`
 */
export const useWriteLendingPoolSwapBorrowRateMode =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'swapBorrowRateMode',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"updateBridgeProtocolFee"`
 */
export const useWriteLendingPoolUpdateBridgeProtocolFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'updateBridgeProtocolFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"updateFlashloanPremiums"`
 */
export const useWriteLendingPoolUpdateFlashloanPremiums =
  /*#__PURE__*/ createUseWriteContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'updateFlashloanPremiums',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteLendingPoolWithdraw = /*#__PURE__*/ createUseWriteContract(
  {
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'withdraw',
  },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__
 */
export const useSimulateLendingPool = /*#__PURE__*/ createUseSimulateContract({
  abi: lendingPoolAbi,
  address: lendingPoolAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"backUnbacked"`
 */
export const useSimulateLendingPoolBackUnbacked =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'backUnbacked',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"borrow"`
 */
export const useSimulateLendingPoolBorrow =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'borrow',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"configureEModeCategory"`
 */
export const useSimulateLendingPoolConfigureEModeCategory =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'configureEModeCategory',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateLendingPoolDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"dropReserve"`
 */
export const useSimulateLendingPoolDropReserve =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'dropReserve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"finalizeTransfer"`
 */
export const useSimulateLendingPoolFinalizeTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'finalizeTransfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"flashLoan"`
 */
export const useSimulateLendingPoolFlashLoan =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'flashLoan',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"flashLoanSimple"`
 */
export const useSimulateLendingPoolFlashLoanSimple =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'flashLoanSimple',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"initReserve"`
 */
export const useSimulateLendingPoolInitReserve =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'initReserve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateLendingPoolInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"liquidationCall"`
 */
export const useSimulateLendingPoolLiquidationCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'liquidationCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"mintToTreasury"`
 */
export const useSimulateLendingPoolMintToTreasury =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'mintToTreasury',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"mintUnbacked"`
 */
export const useSimulateLendingPoolMintUnbacked =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'mintUnbacked',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"rebalanceStableBorrowRate"`
 */
export const useSimulateLendingPoolRebalanceStableBorrowRate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'rebalanceStableBorrowRate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"repay"`
 */
export const useSimulateLendingPoolRepay =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'repay',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"repayWithATokens"`
 */
export const useSimulateLendingPoolRepayWithATokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'repayWithATokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"repayWithPermit"`
 */
export const useSimulateLendingPoolRepayWithPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'repayWithPermit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"rescueTokens"`
 */
export const useSimulateLendingPoolRescueTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'rescueTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"resetIsolationModeTotalDebt"`
 */
export const useSimulateLendingPoolResetIsolationModeTotalDebt =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'resetIsolationModeTotalDebt',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"setConfiguration"`
 */
export const useSimulateLendingPoolSetConfiguration =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'setConfiguration',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"setReserveInterestRateStrategyAddress"`
 */
export const useSimulateLendingPoolSetReserveInterestRateStrategyAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'setReserveInterestRateStrategyAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"setUserEMode"`
 */
export const useSimulateLendingPoolSetUserEMode =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'setUserEMode',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"setUserUseReserveAsCollateral"`
 */
export const useSimulateLendingPoolSetUserUseReserveAsCollateral =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'setUserUseReserveAsCollateral',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"supply"`
 */
export const useSimulateLendingPoolSupply =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'supply',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"supplyWithPermit"`
 */
export const useSimulateLendingPoolSupplyWithPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'supplyWithPermit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"swapBorrowRateMode"`
 */
export const useSimulateLendingPoolSwapBorrowRateMode =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'swapBorrowRateMode',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"updateBridgeProtocolFee"`
 */
export const useSimulateLendingPoolUpdateBridgeProtocolFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'updateBridgeProtocolFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"updateFlashloanPremiums"`
 */
export const useSimulateLendingPoolUpdateFlashloanPremiums =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'updateFlashloanPremiums',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lendingPoolAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateLendingPoolWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__
 */
export const useWatchLendingPoolEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__ and `eventName` set to `"BackUnbacked"`
 */
export const useWatchLendingPoolBackUnbackedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    eventName: 'BackUnbacked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__ and `eventName` set to `"Borrow"`
 */
export const useWatchLendingPoolBorrowEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    eventName: 'Borrow',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__ and `eventName` set to `"FlashLoan"`
 */
export const useWatchLendingPoolFlashLoanEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    eventName: 'FlashLoan',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__ and `eventName` set to `"IsolationModeTotalDebtUpdated"`
 */
export const useWatchLendingPoolIsolationModeTotalDebtUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    eventName: 'IsolationModeTotalDebtUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__ and `eventName` set to `"LiquidationCall"`
 */
export const useWatchLendingPoolLiquidationCallEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    eventName: 'LiquidationCall',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__ and `eventName` set to `"MintUnbacked"`
 */
export const useWatchLendingPoolMintUnbackedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    eventName: 'MintUnbacked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__ and `eventName` set to `"MintedToTreasury"`
 */
export const useWatchLendingPoolMintedToTreasuryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    eventName: 'MintedToTreasury',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__ and `eventName` set to `"RebalanceStableBorrowRate"`
 */
export const useWatchLendingPoolRebalanceStableBorrowRateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    eventName: 'RebalanceStableBorrowRate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__ and `eventName` set to `"Repay"`
 */
export const useWatchLendingPoolRepayEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    eventName: 'Repay',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__ and `eventName` set to `"ReserveDataUpdated"`
 */
export const useWatchLendingPoolReserveDataUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    eventName: 'ReserveDataUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__ and `eventName` set to `"ReserveUsedAsCollateralDisabled"`
 */
export const useWatchLendingPoolReserveUsedAsCollateralDisabledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    eventName: 'ReserveUsedAsCollateralDisabled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__ and `eventName` set to `"ReserveUsedAsCollateralEnabled"`
 */
export const useWatchLendingPoolReserveUsedAsCollateralEnabledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    eventName: 'ReserveUsedAsCollateralEnabled',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__ and `eventName` set to `"Supply"`
 */
export const useWatchLendingPoolSupplyEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    eventName: 'Supply',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__ and `eventName` set to `"SwapBorrowRateMode"`
 */
export const useWatchLendingPoolSwapBorrowRateModeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    eventName: 'SwapBorrowRateMode',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__ and `eventName` set to `"UserEModeSet"`
 */
export const useWatchLendingPoolUserEModeSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    eventName: 'UserEModeSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lendingPoolAbi}__ and `eventName` set to `"Withdraw"`
 */
export const useWatchLendingPoolWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lendingPoolAbi,
    address: lendingPoolAddress,
    eventName: 'Withdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__
 */
export const useReadLoopStrategy = /*#__PURE__*/ createUseReadContract({
  abi: loopStrategyAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const useReadLoopStrategyDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"MANAGER_ROLE"`
 */
export const useReadLoopStrategyManagerRole =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'MANAGER_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"PAUSER_ROLE"`
 */
export const useReadLoopStrategyPauserRole =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'PAUSER_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"UPGRADER_ROLE"`
 */
export const useReadLoopStrategyUpgraderRole =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'UPGRADER_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 */
export const useReadLoopStrategyUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadLoopStrategyAllowance = /*#__PURE__*/ createUseReadContract(
  { abi: loopStrategyAbi, functionName: 'allowance' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"asset"`
 */
export const useReadLoopStrategyAsset = /*#__PURE__*/ createUseReadContract({
  abi: loopStrategyAbi,
  functionName: 'asset',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadLoopStrategyBalanceOf = /*#__PURE__*/ createUseReadContract(
  { abi: loopStrategyAbi, functionName: 'balanceOf' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"collateralUSD"`
 */
export const useReadLoopStrategyCollateralUsd =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'collateralUSD',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"convertToAssets"`
 */
export const useReadLoopStrategyConvertToAssets =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'convertToAssets',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"convertToShares"`
 */
export const useReadLoopStrategyConvertToShares =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'convertToShares',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"currentCollateralRatio"`
 */
export const useReadLoopStrategyCurrentCollateralRatio =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'currentCollateralRatio',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"debtUSD"`
 */
export const useReadLoopStrategyDebtUsd = /*#__PURE__*/ createUseReadContract({
  abi: loopStrategyAbi,
  functionName: 'debtUSD',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadLoopStrategyDecimals = /*#__PURE__*/ createUseReadContract({
  abi: loopStrategyAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"equity"`
 */
export const useReadLoopStrategyEquity = /*#__PURE__*/ createUseReadContract({
  abi: loopStrategyAbi,
  functionName: 'equity',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"equityUSD"`
 */
export const useReadLoopStrategyEquityUsd = /*#__PURE__*/ createUseReadContract(
  { abi: loopStrategyAbi, functionName: 'equityUSD' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"getAssets"`
 */
export const useReadLoopStrategyGetAssets = /*#__PURE__*/ createUseReadContract(
  { abi: loopStrategyAbi, functionName: 'getAssets' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"getAssetsCap"`
 */
export const useReadLoopStrategyGetAssetsCap =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'getAssetsCap',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"getCollateralRatioTargets"`
 */
export const useReadLoopStrategyGetCollateralRatioTargets =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'getCollateralRatioTargets',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"getLendingPool"`
 */
export const useReadLoopStrategyGetLendingPool =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'getLendingPool',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"getMaxIterations"`
 */
export const useReadLoopStrategyGetMaxIterations =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'getMaxIterations',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"getMaxSlippageOnRebalance"`
 */
export const useReadLoopStrategyGetMaxSlippageOnRebalance =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'getMaxSlippageOnRebalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"getOracle"`
 */
export const useReadLoopStrategyGetOracle = /*#__PURE__*/ createUseReadContract(
  { abi: loopStrategyAbi, functionName: 'getOracle' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"getPoolAddressProvider"`
 */
export const useReadLoopStrategyGetPoolAddressProvider =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'getPoolAddressProvider',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"getRatioMargin"`
 */
export const useReadLoopStrategyGetRatioMargin =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'getRatioMargin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const useReadLoopStrategyGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"getSwapper"`
 */
export const useReadLoopStrategyGetSwapper =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'getSwapper',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"hasRole"`
 */
export const useReadLoopStrategyHasRole = /*#__PURE__*/ createUseReadContract({
  abi: loopStrategyAbi,
  functionName: 'hasRole',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"maxDeposit"`
 */
export const useReadLoopStrategyMaxDeposit =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'maxDeposit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"maxMint"`
 */
export const useReadLoopStrategyMaxMint = /*#__PURE__*/ createUseReadContract({
  abi: loopStrategyAbi,
  functionName: 'maxMint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"maxRedeem"`
 */
export const useReadLoopStrategyMaxRedeem = /*#__PURE__*/ createUseReadContract(
  { abi: loopStrategyAbi, functionName: 'maxRedeem' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"maxWithdraw"`
 */
export const useReadLoopStrategyMaxWithdraw =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'maxWithdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"mint"`
 */
export const useReadLoopStrategyMint = /*#__PURE__*/ createUseReadContract({
  abi: loopStrategyAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"name"`
 */
export const useReadLoopStrategyName = /*#__PURE__*/ createUseReadContract({
  abi: loopStrategyAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"paused"`
 */
export const useReadLoopStrategyPaused = /*#__PURE__*/ createUseReadContract({
  abi: loopStrategyAbi,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"previewDeposit"`
 */
export const useReadLoopStrategyPreviewDeposit =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'previewDeposit',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"previewMint"`
 */
export const useReadLoopStrategyPreviewMint =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'previewMint',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"previewRedeem"`
 */
export const useReadLoopStrategyPreviewRedeem =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'previewRedeem',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"previewWithdraw"`
 */
export const useReadLoopStrategyPreviewWithdraw =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'previewWithdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadLoopStrategyProxiableUuid =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'proxiableUUID',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"rebalanceNeeded"`
 */
export const useReadLoopStrategyRebalanceNeeded =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'rebalanceNeeded',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadLoopStrategySupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadLoopStrategySymbol = /*#__PURE__*/ createUseReadContract({
  abi: loopStrategyAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"totalAssets"`
 */
export const useReadLoopStrategyTotalAssets =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'totalAssets',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadLoopStrategyTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: loopStrategyAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"withdraw"`
 */
export const useReadLoopStrategyWithdraw = /*#__PURE__*/ createUseReadContract({
  abi: loopStrategyAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__
 */
export const useWriteLoopStrategy = /*#__PURE__*/ createUseWriteContract({
  abi: loopStrategyAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"LoopStrategy_init"`
 */
export const useWriteLoopStrategyLoopStrategyInit =
  /*#__PURE__*/ createUseWriteContract({
    abi: loopStrategyAbi,
    functionName: 'LoopStrategy_init',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteLoopStrategyApprove = /*#__PURE__*/ createUseWriteContract(
  { abi: loopStrategyAbi, functionName: 'approve' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteLoopStrategyDeposit = /*#__PURE__*/ createUseWriteContract(
  { abi: loopStrategyAbi, functionName: 'deposit' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"grantRole"`
 */
export const useWriteLoopStrategyGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: loopStrategyAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteLoopStrategyPause = /*#__PURE__*/ createUseWriteContract({
  abi: loopStrategyAbi,
  functionName: 'pause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"rebalance"`
 */
export const useWriteLoopStrategyRebalance =
  /*#__PURE__*/ createUseWriteContract({
    abi: loopStrategyAbi,
    functionName: 'rebalance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"redeem"`
 */
export const useWriteLoopStrategyRedeem = /*#__PURE__*/ createUseWriteContract({
  abi: loopStrategyAbi,
  functionName: 'redeem',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useWriteLoopStrategyRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: loopStrategyAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useWriteLoopStrategyRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: loopStrategyAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"setAssetsCap"`
 */
export const useWriteLoopStrategySetAssetsCap =
  /*#__PURE__*/ createUseWriteContract({
    abi: loopStrategyAbi,
    functionName: 'setAssetsCap',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"setCollateralRatioTargets"`
 */
export const useWriteLoopStrategySetCollateralRatioTargets =
  /*#__PURE__*/ createUseWriteContract({
    abi: loopStrategyAbi,
    functionName: 'setCollateralRatioTargets',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"setInterestRateMode"`
 */
export const useWriteLoopStrategySetInterestRateMode =
  /*#__PURE__*/ createUseWriteContract({
    abi: loopStrategyAbi,
    functionName: 'setInterestRateMode',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"setMaxIterations"`
 */
export const useWriteLoopStrategySetMaxIterations =
  /*#__PURE__*/ createUseWriteContract({
    abi: loopStrategyAbi,
    functionName: 'setMaxIterations',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"setMaxSlippageOnRebalance"`
 */
export const useWriteLoopStrategySetMaxSlippageOnRebalance =
  /*#__PURE__*/ createUseWriteContract({
    abi: loopStrategyAbi,
    functionName: 'setMaxSlippageOnRebalance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"setRatioMargin"`
 */
export const useWriteLoopStrategySetRatioMargin =
  /*#__PURE__*/ createUseWriteContract({
    abi: loopStrategyAbi,
    functionName: 'setRatioMargin',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"setSwapper"`
 */
export const useWriteLoopStrategySetSwapper =
  /*#__PURE__*/ createUseWriteContract({
    abi: loopStrategyAbi,
    functionName: 'setSwapper',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteLoopStrategyTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: loopStrategyAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteLoopStrategyTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: loopStrategyAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteLoopStrategyUnpause = /*#__PURE__*/ createUseWriteContract(
  { abi: loopStrategyAbi, functionName: 'unpause' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWriteLoopStrategyUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: loopStrategyAbi,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__
 */
export const useSimulateLoopStrategy = /*#__PURE__*/ createUseSimulateContract({
  abi: loopStrategyAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"LoopStrategy_init"`
 */
export const useSimulateLoopStrategyLoopStrategyInit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'LoopStrategy_init',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateLoopStrategyApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateLoopStrategyDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"grantRole"`
 */
export const useSimulateLoopStrategyGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateLoopStrategyPause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'pause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"rebalance"`
 */
export const useSimulateLoopStrategyRebalance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'rebalance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"redeem"`
 */
export const useSimulateLoopStrategyRedeem =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'redeem',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"renounceRole"`
 */
export const useSimulateLoopStrategyRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"revokeRole"`
 */
export const useSimulateLoopStrategyRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"setAssetsCap"`
 */
export const useSimulateLoopStrategySetAssetsCap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'setAssetsCap',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"setCollateralRatioTargets"`
 */
export const useSimulateLoopStrategySetCollateralRatioTargets =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'setCollateralRatioTargets',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"setInterestRateMode"`
 */
export const useSimulateLoopStrategySetInterestRateMode =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'setInterestRateMode',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"setMaxIterations"`
 */
export const useSimulateLoopStrategySetMaxIterations =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'setMaxIterations',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"setMaxSlippageOnRebalance"`
 */
export const useSimulateLoopStrategySetMaxSlippageOnRebalance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'setMaxSlippageOnRebalance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"setRatioMargin"`
 */
export const useSimulateLoopStrategySetRatioMargin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'setRatioMargin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"setSwapper"`
 */
export const useSimulateLoopStrategySetSwapper =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'setSwapper',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateLoopStrategyTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateLoopStrategyTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateLoopStrategyUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link loopStrategyAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulateLoopStrategyUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: loopStrategyAbi,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link loopStrategyAbi}__
 */
export const useWatchLoopStrategyEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: loopStrategyAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link loopStrategyAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchLoopStrategyApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: loopStrategyAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link loopStrategyAbi}__ and `eventName` set to `"AssetsCapSet"`
 */
export const useWatchLoopStrategyAssetsCapSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: loopStrategyAbi,
    eventName: 'AssetsCapSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link loopStrategyAbi}__ and `eventName` set to `"CollateralRatioTargetsSet"`
 */
export const useWatchLoopStrategyCollateralRatioTargetsSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: loopStrategyAbi,
    eventName: 'CollateralRatioTargetsSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link loopStrategyAbi}__ and `eventName` set to `"Deposit"`
 */
export const useWatchLoopStrategyDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: loopStrategyAbi,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link loopStrategyAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchLoopStrategyInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: loopStrategyAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link loopStrategyAbi}__ and `eventName` set to `"MaxIterationsSet"`
 */
export const useWatchLoopStrategyMaxIterationsSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: loopStrategyAbi,
    eventName: 'MaxIterationsSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link loopStrategyAbi}__ and `eventName` set to `"MaxSlippageOnRebalanceSet"`
 */
export const useWatchLoopStrategyMaxSlippageOnRebalanceSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: loopStrategyAbi,
    eventName: 'MaxSlippageOnRebalanceSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link loopStrategyAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchLoopStrategyPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: loopStrategyAbi,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link loopStrategyAbi}__ and `eventName` set to `"RatioMarginSet"`
 */
export const useWatchLoopStrategyRatioMarginSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: loopStrategyAbi,
    eventName: 'RatioMarginSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link loopStrategyAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const useWatchLoopStrategyRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: loopStrategyAbi,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link loopStrategyAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const useWatchLoopStrategyRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: loopStrategyAbi,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link loopStrategyAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const useWatchLoopStrategyRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: loopStrategyAbi,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link loopStrategyAbi}__ and `eventName` set to `"SwapperSet"`
 */
export const useWatchLoopStrategySwapperSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: loopStrategyAbi,
    eventName: 'SwapperSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link loopStrategyAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchLoopStrategyTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: loopStrategyAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link loopStrategyAbi}__ and `eventName` set to `"USDMarginSet"`
 */
export const useWatchLoopStrategyUsdMarginSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: loopStrategyAbi,
    eventName: 'USDMarginSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link loopStrategyAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchLoopStrategyUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: loopStrategyAbi,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link loopStrategyAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchLoopStrategyUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: loopStrategyAbi,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link loopStrategyAbi}__ and `eventName` set to `"Withdraw"`
 */
export const useWatchLoopStrategyWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: loopStrategyAbi,
    eventName: 'Withdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolDataProviderAbi}__
 */
export const useReadPoolDataProvider = /*#__PURE__*/ createUseReadContract({
  abi: poolDataProviderAbi,
  address: poolDataProviderAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolDataProviderAbi}__ and `functionName` set to `"ETH_CURRENCY_UNIT"`
 */
export const useReadPoolDataProviderEthCurrencyUnit =
  /*#__PURE__*/ createUseReadContract({
    abi: poolDataProviderAbi,
    address: poolDataProviderAddress,
    functionName: 'ETH_CURRENCY_UNIT',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolDataProviderAbi}__ and `functionName` set to `"MKR_ADDRESS"`
 */
export const useReadPoolDataProviderMkrAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: poolDataProviderAbi,
    address: poolDataProviderAddress,
    functionName: 'MKR_ADDRESS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolDataProviderAbi}__ and `functionName` set to `"bytes32ToString"`
 */
export const useReadPoolDataProviderBytes32ToString =
  /*#__PURE__*/ createUseReadContract({
    abi: poolDataProviderAbi,
    address: poolDataProviderAddress,
    functionName: 'bytes32ToString',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolDataProviderAbi}__ and `functionName` set to `"getReservesData"`
 */
export const useReadPoolDataProviderGetReservesData =
  /*#__PURE__*/ createUseReadContract({
    abi: poolDataProviderAbi,
    address: poolDataProviderAddress,
    functionName: 'getReservesData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolDataProviderAbi}__ and `functionName` set to `"getReservesList"`
 */
export const useReadPoolDataProviderGetReservesList =
  /*#__PURE__*/ createUseReadContract({
    abi: poolDataProviderAbi,
    address: poolDataProviderAddress,
    functionName: 'getReservesList',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolDataProviderAbi}__ and `functionName` set to `"getUserReservesData"`
 */
export const useReadPoolDataProviderGetUserReservesData =
  /*#__PURE__*/ createUseReadContract({
    abi: poolDataProviderAbi,
    address: poolDataProviderAddress,
    functionName: 'getUserReservesData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolDataProviderAbi}__ and `functionName` set to `"marketReferenceCurrencyPriceInUsdProxyAggregator"`
 */
export const useReadPoolDataProviderMarketReferenceCurrencyPriceInUsdProxyAggregator =
  /*#__PURE__*/ createUseReadContract({
    abi: poolDataProviderAbi,
    address: poolDataProviderAddress,
    functionName: 'marketReferenceCurrencyPriceInUsdProxyAggregator',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolDataProviderAbi}__ and `functionName` set to `"networkBaseTokenPriceInUsdProxyAggregator"`
 */
export const useReadPoolDataProviderNetworkBaseTokenPriceInUsdProxyAggregator =
  /*#__PURE__*/ createUseReadContract({
    abi: poolDataProviderAbi,
    address: poolDataProviderAddress,
    functionName: 'networkBaseTokenPriceInUsdProxyAggregator',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__
 */
export const useReadProtocolDataProvider = /*#__PURE__*/ createUseReadContract({
  abi: protocolDataProviderAbi,
  address: protocolDataProviderAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__ and `functionName` set to `"ADDRESSES_PROVIDER"`
 */
export const useReadProtocolDataProviderAddressesProvider =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: 'ADDRESSES_PROVIDER',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__ and `functionName` set to `"getATokenTotalSupply"`
 */
export const useReadProtocolDataProviderGetATokenTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: 'getATokenTotalSupply',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__ and `functionName` set to `"getAllATokens"`
 */
export const useReadProtocolDataProviderGetAllATokens =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: 'getAllATokens',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__ and `functionName` set to `"getAllReservesTokens"`
 */
export const useReadProtocolDataProviderGetAllReservesTokens =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: 'getAllReservesTokens',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__ and `functionName` set to `"getDebtCeiling"`
 */
export const useReadProtocolDataProviderGetDebtCeiling =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: 'getDebtCeiling',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__ and `functionName` set to `"getDebtCeilingDecimals"`
 */
export const useReadProtocolDataProviderGetDebtCeilingDecimals =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: 'getDebtCeilingDecimals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__ and `functionName` set to `"getFlashLoanEnabled"`
 */
export const useReadProtocolDataProviderGetFlashLoanEnabled =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: 'getFlashLoanEnabled',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__ and `functionName` set to `"getInterestRateStrategyAddress"`
 */
export const useReadProtocolDataProviderGetInterestRateStrategyAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: 'getInterestRateStrategyAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__ and `functionName` set to `"getLiquidationProtocolFee"`
 */
export const useReadProtocolDataProviderGetLiquidationProtocolFee =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: 'getLiquidationProtocolFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__ and `functionName` set to `"getPaused"`
 */
export const useReadProtocolDataProviderGetPaused =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: 'getPaused',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__ and `functionName` set to `"getReserveCaps"`
 */
export const useReadProtocolDataProviderGetReserveCaps =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: 'getReserveCaps',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__ and `functionName` set to `"getReserveConfigurationData"`
 */
export const useReadProtocolDataProviderGetReserveConfigurationData =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: 'getReserveConfigurationData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__ and `functionName` set to `"getReserveData"`
 */
export const useReadProtocolDataProviderGetReserveData =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: 'getReserveData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__ and `functionName` set to `"getReserveEModeCategory"`
 */
export const useReadProtocolDataProviderGetReserveEModeCategory =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: 'getReserveEModeCategory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__ and `functionName` set to `"getReserveTokensAddresses"`
 */
export const useReadProtocolDataProviderGetReserveTokensAddresses =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: 'getReserveTokensAddresses',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__ and `functionName` set to `"getSiloedBorrowing"`
 */
export const useReadProtocolDataProviderGetSiloedBorrowing =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: 'getSiloedBorrowing',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__ and `functionName` set to `"getTotalDebt"`
 */
export const useReadProtocolDataProviderGetTotalDebt =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: 'getTotalDebt',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__ and `functionName` set to `"getUnbackedMintCap"`
 */
export const useReadProtocolDataProviderGetUnbackedMintCap =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: 'getUnbackedMintCap',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link protocolDataProviderAbi}__ and `functionName` set to `"getUserReserveData"`
 */
export const useReadProtocolDataProviderGetUserReserveData =
  /*#__PURE__*/ createUseReadContract({
    abi: protocolDataProviderAbi,
    address: protocolDataProviderAddress,
    functionName: 'getUserReserveData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardsControllerAbi}__
 */
export const useReadRewardsController = /*#__PURE__*/ createUseReadContract({
  abi: rewardsControllerAbi,
  address: rewardsControllerAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"EMISSION_MANAGER"`
 */
export const useReadRewardsControllerEmissionManager =
  /*#__PURE__*/ createUseReadContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'EMISSION_MANAGER',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"REVISION"`
 */
export const useReadRewardsControllerRevision =
  /*#__PURE__*/ createUseReadContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'REVISION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"getAllUserRewards"`
 */
export const useReadRewardsControllerGetAllUserRewards =
  /*#__PURE__*/ createUseReadContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'getAllUserRewards',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"getAssetDecimals"`
 */
export const useReadRewardsControllerGetAssetDecimals =
  /*#__PURE__*/ createUseReadContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'getAssetDecimals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"getAssetIndex"`
 */
export const useReadRewardsControllerGetAssetIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'getAssetIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"getClaimer"`
 */
export const useReadRewardsControllerGetClaimer =
  /*#__PURE__*/ createUseReadContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'getClaimer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"getDistributionEnd"`
 */
export const useReadRewardsControllerGetDistributionEnd =
  /*#__PURE__*/ createUseReadContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'getDistributionEnd',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"getEmissionManager"`
 */
export const useReadRewardsControllerGetEmissionManager =
  /*#__PURE__*/ createUseReadContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'getEmissionManager',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"getRewardOracle"`
 */
export const useReadRewardsControllerGetRewardOracle =
  /*#__PURE__*/ createUseReadContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'getRewardOracle',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"getRewardsByAsset"`
 */
export const useReadRewardsControllerGetRewardsByAsset =
  /*#__PURE__*/ createUseReadContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'getRewardsByAsset',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"getRewardsData"`
 */
export const useReadRewardsControllerGetRewardsData =
  /*#__PURE__*/ createUseReadContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'getRewardsData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"getRewardsList"`
 */
export const useReadRewardsControllerGetRewardsList =
  /*#__PURE__*/ createUseReadContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'getRewardsList',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"getTransferStrategy"`
 */
export const useReadRewardsControllerGetTransferStrategy =
  /*#__PURE__*/ createUseReadContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'getTransferStrategy',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"getUserAccruedRewards"`
 */
export const useReadRewardsControllerGetUserAccruedRewards =
  /*#__PURE__*/ createUseReadContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'getUserAccruedRewards',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"getUserAssetIndex"`
 */
export const useReadRewardsControllerGetUserAssetIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'getUserAssetIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"getUserRewards"`
 */
export const useReadRewardsControllerGetUserRewards =
  /*#__PURE__*/ createUseReadContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'getUserRewards',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"temporaryOverrideAdmin"`
 */
export const useReadRewardsControllerTemporaryOverrideAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'temporaryOverrideAdmin',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardsControllerAbi}__
 */
export const useWriteRewardsController = /*#__PURE__*/ createUseWriteContract({
  abi: rewardsControllerAbi,
  address: rewardsControllerAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"claimAllRewards"`
 */
export const useWriteRewardsControllerClaimAllRewards =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'claimAllRewards',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"claimAllRewardsOnBehalf"`
 */
export const useWriteRewardsControllerClaimAllRewardsOnBehalf =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'claimAllRewardsOnBehalf',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"claimAllRewardsToSelf"`
 */
export const useWriteRewardsControllerClaimAllRewardsToSelf =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'claimAllRewardsToSelf',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"claimRewards"`
 */
export const useWriteRewardsControllerClaimRewards =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'claimRewards',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"claimRewardsOnBehalf"`
 */
export const useWriteRewardsControllerClaimRewardsOnBehalf =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'claimRewardsOnBehalf',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"claimRewardsToSelf"`
 */
export const useWriteRewardsControllerClaimRewardsToSelf =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'claimRewardsToSelf',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"configureAssets"`
 */
export const useWriteRewardsControllerConfigureAssets =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'configureAssets',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"handleAction"`
 */
export const useWriteRewardsControllerHandleAction =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'handleAction',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteRewardsControllerInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"renounceTemporaryOverrideAdmin"`
 */
export const useWriteRewardsControllerRenounceTemporaryOverrideAdmin =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'renounceTemporaryOverrideAdmin',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"setClaimer"`
 */
export const useWriteRewardsControllerSetClaimer =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'setClaimer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"setDistributionEnd"`
 */
export const useWriteRewardsControllerSetDistributionEnd =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'setDistributionEnd',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"setEmissionPerSecond"`
 */
export const useWriteRewardsControllerSetEmissionPerSecond =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'setEmissionPerSecond',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"setRewardOracle"`
 */
export const useWriteRewardsControllerSetRewardOracle =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'setRewardOracle',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"setTransferStrategy"`
 */
export const useWriteRewardsControllerSetTransferStrategy =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'setTransferStrategy',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"setUserData"`
 */
export const useWriteRewardsControllerSetUserData =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'setUserData',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardsControllerAbi}__
 */
export const useSimulateRewardsController =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"claimAllRewards"`
 */
export const useSimulateRewardsControllerClaimAllRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'claimAllRewards',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"claimAllRewardsOnBehalf"`
 */
export const useSimulateRewardsControllerClaimAllRewardsOnBehalf =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'claimAllRewardsOnBehalf',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"claimAllRewardsToSelf"`
 */
export const useSimulateRewardsControllerClaimAllRewardsToSelf =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'claimAllRewardsToSelf',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"claimRewards"`
 */
export const useSimulateRewardsControllerClaimRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'claimRewards',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"claimRewardsOnBehalf"`
 */
export const useSimulateRewardsControllerClaimRewardsOnBehalf =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'claimRewardsOnBehalf',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"claimRewardsToSelf"`
 */
export const useSimulateRewardsControllerClaimRewardsToSelf =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'claimRewardsToSelf',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"configureAssets"`
 */
export const useSimulateRewardsControllerConfigureAssets =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'configureAssets',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"handleAction"`
 */
export const useSimulateRewardsControllerHandleAction =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'handleAction',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateRewardsControllerInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"renounceTemporaryOverrideAdmin"`
 */
export const useSimulateRewardsControllerRenounceTemporaryOverrideAdmin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'renounceTemporaryOverrideAdmin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"setClaimer"`
 */
export const useSimulateRewardsControllerSetClaimer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'setClaimer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"setDistributionEnd"`
 */
export const useSimulateRewardsControllerSetDistributionEnd =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'setDistributionEnd',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"setEmissionPerSecond"`
 */
export const useSimulateRewardsControllerSetEmissionPerSecond =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'setEmissionPerSecond',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"setRewardOracle"`
 */
export const useSimulateRewardsControllerSetRewardOracle =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'setRewardOracle',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"setTransferStrategy"`
 */
export const useSimulateRewardsControllerSetTransferStrategy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'setTransferStrategy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardsControllerAbi}__ and `functionName` set to `"setUserData"`
 */
export const useSimulateRewardsControllerSetUserData =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    functionName: 'setUserData',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rewardsControllerAbi}__
 */
export const useWatchRewardsControllerEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rewardsControllerAbi}__ and `eventName` set to `"Accrued"`
 */
export const useWatchRewardsControllerAccruedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    eventName: 'Accrued',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rewardsControllerAbi}__ and `eventName` set to `"AccruedIndexChange"`
 */
export const useWatchRewardsControllerAccruedIndexChangeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    eventName: 'AccruedIndexChange',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rewardsControllerAbi}__ and `eventName` set to `"AssetConfigUpdated"`
 */
export const useWatchRewardsControllerAssetConfigUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    eventName: 'AssetConfigUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rewardsControllerAbi}__ and `eventName` set to `"ClaimerSet"`
 */
export const useWatchRewardsControllerClaimerSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    eventName: 'ClaimerSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rewardsControllerAbi}__ and `eventName` set to `"RewardOracleUpdated"`
 */
export const useWatchRewardsControllerRewardOracleUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    eventName: 'RewardOracleUpdated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rewardsControllerAbi}__ and `eventName` set to `"RewardsClaimed"`
 */
export const useWatchRewardsControllerRewardsClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    eventName: 'RewardsClaimed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rewardsControllerAbi}__ and `eventName` set to `"TemporaryOverrideAdminSet"`
 */
export const useWatchRewardsControllerTemporaryOverrideAdminSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    eventName: 'TemporaryOverrideAdminSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link rewardsControllerAbi}__ and `eventName` set to `"TransferStrategyInstalled"`
 */
export const useWatchRewardsControllerTransferStrategyInstalledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: rewardsControllerAbi,
    address: rewardsControllerAddress,
    eventName: 'TransferStrategyInstalled',
  })
