import { Address } from "viem";
import { formatUnitsToNumber, normalizeDecimals } from "./helpers";
import { SECONDS_PER_YEAR, assetLogos } from "../../app/meta";

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

export interface Incentives {
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

export interface IncentiveApy {
  totalApy: number;
  rewardTokens: RewardToken[];
}

function parseRewardsTokenInformation(
  rewardsTokenInformation: RewardTokenInformation[],
  totalUsd: bigint,
  seamPrice: bigint
): IncentiveApy {
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

export function parseIncentives(
  incentives: IncentiveData,
  totalUsd: bigint,
  seamPrice: bigint
): IncentiveApy {
  const result = incentives
    ? parseRewardsTokenInformation(
        incentives.rewardsTokenInformation,
        totalUsd,
        seamPrice
      )
    : {
        totalApy: 0,
        rewardTokens: [],
      };

  return result;
}
