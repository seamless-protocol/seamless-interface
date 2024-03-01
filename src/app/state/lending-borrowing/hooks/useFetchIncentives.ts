import { Address, parseEther } from "viem";
import {
  formatIncentiveApyToViewNumber,
  formatUnitsToNumber,
  normalizeDecimals,
} from "../../../../shared/utils/helpers";
import {
  AAVE_ADDRESS_PROVIDER,
  SECONDS_PER_YEAR,
  assetLogos,
} from "../../../meta";
import { useReadContract } from "wagmi";
import {
  incentiveDataProviderAbi,
  incentiveDataProviderAddress,
} from "../../../generated/generated";
import { useFetchDetailAssetTotalSupply } from "../../asset/hooks/useFetchViewDetailAssetTotalSupply";
import { baseAssets } from "../config/BaseAssetsConfig";
import { useFetchCoinGeckoSeamPrice } from "../../common/hooks/useFetchCoinGeckoSeamPrice";

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
  seamPrice: number
) {
  let totalApy = 0;
  let rewardTokens: RewardToken[] = [];

  if (totalUsd === 0n) {
    return { totalApy, rewardTokens };
  }

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
        ? parseEther((seamPrice || 0n).toString())
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
  seamPrice: number
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

export const useFetchIncentives = (asset: Address) => {
  const baseAsset = baseAssets.find((e) => e.address === asset)!;

  const {
    isLoading: isIncentivesLoading,
    isFetched: isIncentivesFetched,
    data,
  } = useReadContract({
    address: incentiveDataProviderAddress,
    abi: incentiveDataProviderAbi,
    functionName: "getReservesIncentivesData",
    args: [AAVE_ADDRESS_PROVIDER],
  });

  const {
    isLoading: isTotalSuppliedLoading,
    isFetched: isTotalSuppliedFetched,
    totalSupplyUsd: totalSuppliedUsd,
  } = useFetchDetailAssetTotalSupply(baseAsset.sTokenAddress);

  const {
    isLoading: isTotalBorrowedLoading,
    isFetched: isTotalBorrowedFetched,
    totalSupplyUsd: totalBorrowedUsd,
  } = useFetchDetailAssetTotalSupply(baseAsset.debtTokenAddress);

  const seamPrice = useFetchCoinGeckoSeamPrice();

  let supplyIncentives, borrowIncentives;
  if (data) {
    const incentives = data?.find((e: any) => e.underlyingAsset === asset) as
      | Incentives
      | undefined;

    [supplyIncentives, borrowIncentives] = parseSupplyAndBorrowIncentives(
      incentives,
      totalSuppliedUsd.bigIntValue,
      totalBorrowedUsd.bigIntValue,
      seamPrice || 0
    );
  }

  return {
    isLoading:
      isIncentivesLoading || isTotalSuppliedLoading || isTotalBorrowedLoading,
    isFetched:
      isIncentivesFetched && isTotalSuppliedFetched && isTotalBorrowedFetched,
    supplyIncentives,
    borrowIncentives,
  };
};

export const useFetchViewIncentives = (asset: Address) => {
  const { isLoading, isFetched, supplyIncentives, borrowIncentives } =
    useFetchIncentives(asset);

  return {
    isLoading,
    isFetched,
    data: {
      supplyIncentives: {
        totalApy: formatIncentiveApyToViewNumber(supplyIncentives?.totalApy),
        rewardTokens: supplyIncentives?.rewardTokens || [],
      },
      borrowVariableIncentives: {
        totalApy: formatIncentiveApyToViewNumber(borrowIncentives?.totalApy),
        rewardTokens: borrowIncentives?.rewardTokens || [],
      },
    },
  };
};
