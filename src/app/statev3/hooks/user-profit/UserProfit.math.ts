import { PERCENTAGE_VALUE_DECIMALS } from "../../../../meta";
import { formatFetchBigInt, formatUsdValue } from "../../../../shared/formatters/getFetchBigIntFormatted";
import { FetchBigIntStrict } from "../../../../shared/types/Fetch";
import { cUnrealizedProfitPercentage } from "../user-strategy-profit/UserStrategyProfit.math";

export interface Profit {
  strategyBalance: { dollarAmount: FetchBigIntStrict };
  realizedProfit: FetchBigIntStrict;
  unrealizedProfit: FetchBigIntStrict;
}

export interface cUserProfitInput {
  profits: Profit[];
}

export interface cUserProfitOutput {
  realizedProfit: FetchBigIntStrict;
  unrealizedProfit: FetchBigIntStrict;
  unrealizedProfitPercentage: FetchBigIntStrict;
}

export function cUserProfit({ profits }: cUserProfitInput): cUserProfitOutput {
  const { totalBalanceUsd, realizedProfit, unrealizedProfit } = profits.reduce(
    (acc, { strategyBalance, realizedProfit: realized, unrealizedProfit: unrealized }) => ({
      totalBalanceUsd: acc.totalBalanceUsd + strategyBalance.dollarAmount.bigIntValue,
      realizedProfit: acc.realizedProfit + realized.bigIntValue,
      unrealizedProfit: acc.unrealizedProfit + unrealized.bigIntValue,
    }),
    {
      totalBalanceUsd: 0n,
      realizedProfit: 0n,
      unrealizedProfit: 0n,
    }
  );

  const unrealizedProfitPercentage = cUnrealizedProfitPercentage({
    strategyBalanceUsd: totalBalanceUsd,
    unrealizedProfit,
  });

  return {
    realizedProfit: formatUsdValue(realizedProfit),
    unrealizedProfit: formatUsdValue(unrealizedProfit),
    unrealizedProfitPercentage: formatFetchBigInt(unrealizedProfitPercentage, PERCENTAGE_VALUE_DECIMALS, "%"),
  };
}
