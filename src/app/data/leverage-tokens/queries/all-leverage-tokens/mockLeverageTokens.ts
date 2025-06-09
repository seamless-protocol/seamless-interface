import { formatFetchBigIntToViewBigInt, Token, ViewBigInt, ViewBigIntWithUsdValue, ViewNumber } from "@shared";
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
  tvl?: ViewBigIntWithUsdValue;
  additionalData: {
    description?: string;
  };
  tokenData?: Token;
  collateralAssetTokenData?: Token;
  debtAssetTokenData?: Token;

  config?: {
    collateralPriceLabel?: string;
    fuulProgramId?: string;
  };
}

export const mockLeverageTokens: LeverageToken[] = [
  {
    config: {
      collateralPriceLabel: "weETH/eETH",
      fuulProgramId: "0x0000000000000000000000000000000000000000", // add id
    },
    address: "0xA2fceEAe99d2cAeEe978DA27bE2d95b0381dBB8c" as Address,
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
      description: "A 17x Ether.Fi weETH Yield Loop",
    },
  },
];
