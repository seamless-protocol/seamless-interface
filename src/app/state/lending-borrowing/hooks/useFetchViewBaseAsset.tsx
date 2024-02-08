import { useAccount, useReadContracts } from "wagmi";
import { Displayable } from "../../../../shared";
import { AssetMarketConfig, lendingAssets } from "../config/AssetsConfig";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  incentiveDataProviderAbi,
  incentiveDataProviderAddress,
  lendingPoolAbi,
  lendingPoolAddress,
} from "../../../generated/generated";
import { Address, erc20Abi, parseEther } from "viem";
import {
  convertAprToApy,
  formatToDisplayable,
  formatToDisplayableOrPlaceholder,
  formatUnitsToNumber,
} from "../../../../shared/utils/helpers";
import { ViewBaseAsset } from "../types/ViewBaseAsset";
import { useFetchAssetDecimals } from "../../common/hooks/useFetchAssetDecimals";
import {
  AAVE_ADDRESS_PROVIDER,
  SECONDS_PER_YEAR,
  assetLogos,
} from "../../../meta/constants";
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

  for (let i = 0; i < rewardsTokenInformation.length; i++) {
    const rewardToken = rewardsTokenInformation[i];
    const rewardTokenPrice =
      rewardToken.rewardTokenSymbol === "SEAM"
        ? parseEther((seamPrice || 0n).toString())
        : 0n;
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

function useFetchBaseAsset(assetMarketConfig: AssetMarketConfig | undefined) {
  const account = useAccount();

  const { decimals } = useFetchAssetDecimals(
    assetMarketConfig?.address as Address
  );
  const {
    data: results,
    isLoading,
    isFetched,
  } = useReadContracts({
    contracts: [
      {
        address: assetMarketConfig?.sTokenAddress,
        abi: erc20Abi,
        functionName: "totalSupply",
      },
      {
        address: assetMarketConfig?.debtTokenAddress,
        abi: erc20Abi,
        functionName: "totalSupply",
      },
      {
        address: aaveOracleAddress,
        abi: aaveOracleAbi,
        functionName: "getAssetPrice",
        args: [assetMarketConfig?.address as Address],
      },
      {
        address: lendingPoolAddress,
        abi: lendingPoolAbi,
        functionName: "getReserveData",
        args: [assetMarketConfig?.address as Address],
      },
      {
        address: assetMarketConfig?.address,
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
      (e: any) => e.underlyingAsset === assetMarketConfig?.address
    ) as Incentives | undefined;

    [supplyIncentives, borrowIncentives] = parseSupplyAndBorrowIncentives(
      incentives,
      totalSuppliedUsd,
      totalBorrowedUsd,
      seamPrice || 0
    );
  }

  return {
    isLoading,
    isFetched,
    totalSupplied: formatUnitsToNumber(totalSupplied, decimals || 18),
    totalSuppliedUsd: formatUnitsToNumber(totalSuppliedUsd, 8),
    totalBorrowed: formatUnitsToNumber(totalBorrowed, decimals || 18),
    totalBorrowedUsd: formatUnitsToNumber(totalBorrowedUsd, 8),
    supplyApy: supplyApy,
    supplyIncentives,
    borrowApy: borrowApy,
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
  } = useFetchBaseAsset(lendingAssets[index]);

  return {
    isLoading,
    isFetched,
    data: {
      depositAsset: {
        name: lendingAssets[index]?.name,
        symbol: lendingAssets[index]?.symbol,
        logo: lendingAssets[index]?.logo,
      },
      totalSupplied: {
        tokenAmount: {
          value: formatToDisplayable(totalSupplied),
          symbol: "",
        },
        dollarAmount: {
          value: formatToDisplayable(totalSuppliedUsd),
          symbol: "$",
        },
      },
      totalBorrowed: {
        tokenAmount: {
          value: formatToDisplayable(totalBorrowed),
          symbol: "",
        },
        dollarAmount: {
          value: formatToDisplayable(totalBorrowedUsd),
          symbol: "$",
        },
      },
      supplyApy: {
        value: formatToDisplayable(supplyApy || 0),
        symbol: "%",
      },
      borrowApyVariable: {
        value: formatToDisplayable(borrowApy || 0),
        symbol: "%",
      },
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
        value: "—",
        symbol: "",
      },
    },
  };
};
