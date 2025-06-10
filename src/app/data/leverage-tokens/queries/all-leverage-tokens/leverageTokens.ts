import { formatFetchBigIntToViewBigInt, Token, ViewBigInt, ViewBigIntWithUsdValue } from "@shared";
import { Address } from "viem";

export interface LeverageToken {
  address: Address;
  availableSupplyCap: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
  tvl?: ViewBigIntWithUsdValue;
  additionalData: {
    description: string;
  };
  tokenData?: Token;
  collateralAssetTokenData?: Token;
  debtAssetTokenData?: Token;
  limitsConfig: {
    maxBorrowApy: number; // %
    maxDeposit: number;
  };
}

export const leverageTokensConfig: LeverageToken[] = [
  {
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
      description: "Ether.Fi weETH Yield Loop",
    },
    limitsConfig: {
      maxBorrowApy: 2.9,
      maxDeposit: 26,
    },
  },
];
