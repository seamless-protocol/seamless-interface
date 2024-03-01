import { useAccount, useReadContracts } from "wagmi";
import { Displayable } from "../../../../shared";
import { BaseAssetConfig, baseAssets } from "../config/BaseAssetsConfig";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  incentiveDataProviderAbi,
  incentiveDataProviderAddress,
  lendingPoolAbi,
  lendingPoolAddress,
} from "../../../generated/generated";
import { Address, erc20Abi } from "viem";
import {
  convertAprToApy,
  formatFetchNumberToViewNumber,
  formatToDisplayableOrPlaceholder,
  formatFetchBigIntToViewBigInt,
  formatUnitsToNumber,
  normalizeDecimals,
} from "../../../../shared/utils/helpers";
import { ViewBaseAsset } from "../types/ViewBaseAsset";
import { useFetchAssetDecimals } from "../../common/hooks/useFetchAssetDecimals";
import {
  AAVE_ADDRESS_PROVIDER,
  SECONDS_PER_YEAR,
  assetLogos,
} from "../../../meta/constants";
import { useFetchCoinGeckoSeamPrice } from "../../common/hooks/useFetchCoinGeckoSeamPrice";
import { Fetch, FetchBigInt, FetchNumber } from "src/shared/types/Fetch";

interface RewardTokenInformation {
  rewardTokenSymbol: string;
  rewardTokenAddress: Address;
  rewardOracleAddress: Address;
  emissionPerSecond: bigint;
  incentivesLastUpdateTimestamp: bigint;
  tokenIncentivesIndex: bigint;
  emissionEndTimestamp: bigint;
  rewardPriceFeed: bigint;
  rewardTokenDecimals: number;
  precision: number;
  priceFeedDecimals: number;
}

interface IncentiveData {
  tokenAddress: Address;
  incentiveControllerAddress: Address;
  rewardsTokenInformation: RewardTokenInformation[];
}

interface Incentives {
  underlyingAsset: Address;
  aIncentiveData: IncentiveData;
  sIncentiveData: IncentiveData;
  vIncentiveData: IncentiveData;
}

interface RewardToken {
  symbol: string;
  logo: string;
  apy: number;
}

interface IncentiveApy {
  totalApy: number;
  rewardTokens: RewardToken[];
}

function parseRewardsTokenInformation(
  rewardsTokenInformation: RewardTokenInformation[],
  totalUsd: bigint,
  seamPrice: bigint
) {
  let totalApy = 0;
  let rewardTokens: RewardToken[] = [];

  const now = BigInt(Math.floor(Date.now() / 1000));

  for (let i = 0; i < rewardsTokenInformation.length; i++) {
    const rewardToken = rewardsTokenInformation[i];

    // Ignore emissions programs that are now over
    if (rewardToken.emissionEndTimestamp < now) {
      continue;
    }

    const rewardTokenPrice =
      rewardToken.rewardTokenSymbol === "esSEAM" ||
      rewardToken.rewardTokenSymbol === "SEAM"
        ? seamPrice
        : normalizeDecimals(
            rewardToken.rewardPriceFeed,
            BigInt(rewardToken.priceFeedDecimals),
            18n
          );
    const emissionPerYear =
      rewardToken.emissionPerSecond * BigInt(SECONDS_PER_YEAR);
    const rewardTokenApy =
      (emissionPerYear * rewardTokenPrice) / totalUsd / BigInt(10 ** 10);

    const rewardTokenApyFormatted = formatUnitsToNumber(rewardTokenApy, 18);

    rewardTokens.push({
      symbol: rewardToken.rewardTokenSymbol,
      logo: assetLogos.get(rewardToken.rewardTokenSymbol) || "",
      apy: rewardTokenApyFormatted,
    });

    totalApy += rewardTokenApyFormatted * 100;
  }

  return { totalApy, rewardTokens };
}

function parseSupplyAndBorrowIncentives(
  incentives: Incentives | undefined,
  totalSuppliedUsd: bigint,
  totalBorrowedUsd: bigint,
  seamPrice: bigint
): IncentiveApy[] {
  let supplyIncentives = {
    totalApy: 0,
    rewardTokens: [],
  } as IncentiveApy;

  if (incentives && incentives.aIncentiveData) {
    supplyIncentives = parseRewardsTokenInformation(
      incentives.aIncentiveData.rewardsTokenInformation,
      totalSuppliedUsd,
      seamPrice
    );
  }

  let borrowIncentives = {
    totalApy: 0,
    rewardTokens: [],
  } as IncentiveApy;

  if (incentives && incentives.vIncentiveData) {
    borrowIncentives = parseRewardsTokenInformation(
      incentives.vIncentiveData.rewardsTokenInformation,
      totalBorrowedUsd,
      seamPrice
    );
  }

  return [supplyIncentives, borrowIncentives];
}

interface BaseAsset {
  totalSupplied: FetchBigInt;
  totalSuppliedUsd: FetchBigInt;
  totalBorrowed: FetchBigInt;
  totalBorrowedUsd: FetchBigInt;
  supplyApy: FetchNumber;
  borrowApy: FetchNumber;
  supplyIncentives: IncentiveApy | undefined;
  borrowIncentives: IncentiveApy | undefined;
}

function useFetchBaseAsset(
  baseAsset: BaseAssetConfig | undefined
): Fetch<BaseAsset> {
  const account = useAccount();

  const { decimals } = useFetchAssetDecimals(baseAsset?.address as Address);
  const {
    data: results,
    isLoading,
    isFetched,
  } = useReadContracts({
    contracts: [
      {
        address: baseAsset?.sTokenAddress,
        abi: erc20Abi,
        functionName: "totalSupply",
      },
      {
        address: baseAsset?.debtTokenAddress,
        abi: erc20Abi,
        functionName: "totalSupply",
      },
      {
        address: aaveOracleAddress,
        abi: aaveOracleAbi,
        functionName: "getAssetPrice",
        args: [baseAsset?.address as Address],
      },
      {
        address: lendingPoolAddress,
        abi: lendingPoolAbi,
        functionName: "getReserveData",
        args: [baseAsset?.address as Address],
      },
      {
        address: baseAsset?.address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account?.address as Address],
      },
      {
        address: incentiveDataProviderAddress,
        abi: incentiveDataProviderAbi,
        functionName: "getReservesIncentivesData",
        args: [AAVE_ADDRESS_PROVIDER],
      },
    ],
  });

  const seamPrice = useFetchCoinGeckoSeamPrice();
  const baseUnit = 10 ** (decimals || 0);

  let totalSupplied,
    totalSuppliedUsd,
    totalBorrowed,
    totalBorrowedUsd,
    supplyApy,
    supplyIncentives,
    borrowApy,
    borrowIncentives;
  if (results) {
    const price = BigInt(results[2].result || 0);

    totalSupplied = BigInt(results[0].result || 0n);
    totalBorrowed = BigInt(results[1].result || 0n);

    totalSuppliedUsd = (totalSupplied * price) / BigInt(baseUnit);
    totalBorrowedUsd = (totalBorrowed * price) / BigInt(baseUnit);

    const currentLiquidityRate = BigInt(
      results[3].result?.currentLiquidityRate || 0
    );
    const supplyApr = formatUnitsToNumber(currentLiquidityRate, 27);
    supplyApy = convertAprToApy(supplyApr);

    const currentVariableBorrowRate = BigInt(
      results[3].result?.currentVariableBorrowRate || 0
    );
    const borrowApr = formatUnitsToNumber(currentVariableBorrowRate, 27);
    borrowApy = convertAprToApy(borrowApr);

    const incentives = results?.[5].result?.find(
      (e: any) => e.underlyingAsset === baseAsset?.address
    ) as Incentives | undefined;

    [supplyIncentives, borrowIncentives] = parseSupplyAndBorrowIncentives(
      incentives,
      totalSuppliedUsd,
      totalBorrowedUsd,
      seamPrice
    );
  }

  return {
    isLoading,
    isFetched,
    totalSupplied: {
      bigIntValue: totalSupplied || 0n,
      decimals: decimals || 18,
      symbol: "",
    },
    totalSuppliedUsd: {
      bigIntValue: totalSuppliedUsd || 0n,
      decimals: 8,
      symbol: "$",
    },
    totalBorrowed: {
      bigIntValue: totalBorrowed || 0n,
      decimals: decimals || 18,
      symbol: "",
    },
    totalBorrowedUsd: {
      bigIntValue: totalBorrowedUsd || 0n,
      decimals: 8,
      symbol: "$",
    },
    supplyApy: {
      value: supplyApy || 0,
      symbol: "%",
    },
    borrowApy: {
      value: borrowApy || 0,
      symbol: "%",
    },
    supplyIncentives,
    borrowIncentives,
  };
}

export const useFetchViewBaseAsset = (
  index: number
): Displayable<ViewBaseAsset> => {
  const {
    isLoading,
    isFetched,
    totalSupplied,
    totalSuppliedUsd,
    totalBorrowed,
    totalBorrowedUsd,
    supplyApy,
    borrowApy,
    supplyIncentives,
    borrowIncentives,
  } = useFetchBaseAsset(baseAssets[index]);

  return {
    isLoading,
    isFetched,
    data: {
      depositAsset: {
        name: baseAssets[index].name,
        symbol: baseAssets[index].symbol,
        logo: baseAssets[index].logo,
      },
      totalSupplied: {
        tokenAmount: formatFetchBigIntToViewBigInt(totalSupplied),
        dollarAmount: formatFetchBigIntToViewBigInt(totalSuppliedUsd),
      },
      totalBorrowed: {
        tokenAmount: formatFetchBigIntToViewBigInt(totalBorrowed),
        dollarAmount: formatFetchBigIntToViewBigInt(totalBorrowedUsd),
      },
      supplyApy: formatFetchNumberToViewNumber(supplyApy),
      borrowApyVariable: formatFetchNumberToViewNumber(borrowApy),
      supplyIncentives: {
        totalApy: {
          value: formatToDisplayableOrPlaceholder(
            supplyIncentives?.totalApy,
            ""
          ),
          symbol: supplyIncentives && supplyIncentives?.totalApy > 0 ? "%" : "",
        },
        rewardTokens: supplyIncentives?.rewardTokens || [],
      },
      borrowVariableIncentives: {
        totalApy: {
          value: formatToDisplayableOrPlaceholder(
            borrowIncentives?.totalApy,
            ""
          ),
          symbol: borrowIncentives && borrowIncentives?.totalApy > 0 ? "%" : "",
        },
        rewardTokens: borrowIncentives?.rewardTokens || [],
      },
      borrowApyStable: {
        value: 0,
        viewValue: "—",
        symbol: "",
      },
    },
  };
};
