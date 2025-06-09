import {
  formatFetchBigIntToViewBigInt,
  formatFetchNumberToViewNumber,
  Token,
  ViewBigInt,
  ViewBigIntWithUsdValue,
  ViewNumber,
} from "@shared";
import { Address } from "viem";

export interface ViewRewardToken {
  symbol: string;
  address?: Address;
  logo?: string;
  apr?: ViewNumber;
  points?: ViewNumber;
}

export interface LeverageToken {
  address: Address;
  availableSupplyCap: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
  apy: {
    estimatedAPY: ViewNumber;
    restakingAPY?: ViewNumber;
    borrowAPY: ViewNumber;
    yieldAPY: ViewNumber;
    rewardTokens: ViewRewardToken[];
  };
  tvl?: ViewBigIntWithUsdValue;
  additionalData: {
    description?: string;
  };
  tokenData?: Token;
  collateralAssetTokenData?: Token;
  debtAssetTokenData?: Token;

  config?: {
    collateralPriceLabel?: string;
  };
}

export const mockLeverageTokens: LeverageToken[] = [
  {
    config: {
      collateralPriceLabel: "weETH/eETH",
    },
    address: "0xA2fceEAe99d2cAeEe978DA27bE2d95b0381dBB8c" as Address,
    apy: {
      rewardTokens: [],
      yieldAPY: formatFetchNumberToViewNumber({
        value: 55.44,
        symbol: "%",
      }),
      borrowAPY: formatFetchNumberToViewNumber({
        value: 1.44,
        symbol: "%",
      }),
      estimatedAPY: formatFetchNumberToViewNumber({
        value: 12.44,
        symbol: "%",
      }),
    },
    availableSupplyCap: {
      tokenAmount: formatFetchBigIntToViewBigInt({
        bigIntValue: 500_000n * 10n ** 18n,
        decimals: 18,
        symbol: "weETH",
      }),
      dollarAmount: formatFetchBigIntToViewBigInt({
        bigIntValue: 500_000n * 10n ** 6n,
        decimals: 8,
        symbol: "$",
      }),
    },
    additionalData: {
      description: "Description here...",
    },
  },
];
