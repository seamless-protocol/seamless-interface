// fetchLeverageTokenApys.ts
import { Address } from "viem";
import { ViewNumber, formatFetchNumberToViewNumber } from "@shared";
import { fetchEtherFiApr } from "../etherfi-apr/EtherfiApr.fetch";
import { fetchBorrowApy } from "../borrow-apy/borrow-apy.fetch";
import chartIcon from "@assets/common/chart.svg";
import kingIcon from "@assets/tokens/king.svg";
import weETHIcon from "@assets/tokens/weeth.svg";
import seamIcon from "@assets/tokens/seam.svg";
import { fetchLeverageRatios } from "../collateral-ratios/leverage-ratios.fetch";
import { ViewRewardToken } from "../../../../v3/components/tooltip/IncentivesDetailCard";
import { fetchConversionByTokenAddress } from "../../../fuul/queries/fetch-conversions/ConversionsApy.mapper";

export interface LeverageTokenYields {
  estimateNetYield: ViewNumber;
  stakingYield: ViewNumber;
  borrowRate: ViewNumber;
  restakingYield: ViewNumber;
  rewardsYield: ViewNumber | undefined;
  yieldBreakdown: ViewRewardToken[];
  pointsPrograms: ViewRewardToken[];
}

const decimalsOptions = {
  singleDigitNumberDecimals: 0,
  doubleDigitNumberDecimals: 0,
  threeDigitNumberDecimals: 0,
  fourDigitNumberDecimals: 0,
};

export async function fetchLeverageTokenYields(address: Address): Promise<LeverageTokenYields> {
  const [leverageRatios, etherfiData, borrowAPY, fuulAprData] = await Promise.all([
    fetchLeverageRatios(address),
    fetchEtherFiApr(),
    fetchBorrowApy(address),
    fetchConversionByTokenAddress(address),
  ]);

  const targetLeverage =
    leverageRatios.targetLeverage?.value != null ? Number(leverageRatios.targetLeverage?.value) : null;

  const stakingYield = formatFetchNumberToViewNumber({
    value: etherfiData.stakingAPR?.value && targetLeverage ? etherfiData.stakingAPR.value * targetLeverage : undefined,
    symbol: "%",
  });
  const restakingYield = formatFetchNumberToViewNumber({
    value:
      etherfiData.restakingAPR?.value && targetLeverage ? etherfiData.restakingAPR.value * targetLeverage : undefined,
    symbol: "%",
  });
  const borrowAPYFormatted = formatFetchNumberToViewNumber({
    value: borrowAPY && targetLeverage ? borrowAPY * -100 * (targetLeverage - 1) : undefined,
    symbol: "%",
  });

  const fuulAPR = fuulAprData?.fuulApr;

  const estimateNetYield =
    stakingYield.value != null &&
      fuulAPR?.value != null &&
      borrowAPYFormatted.value != null &&
      targetLeverage != null &&
      restakingYield.value != null
      ? formatFetchNumberToViewNumber({
        value: stakingYield.value + restakingYield.value + fuulAPR.value + borrowAPYFormatted.value,
        symbol: "%",
      })
      : formatFetchNumberToViewNumber({ value: undefined, symbol: "%" });

  const yieldBreakdown: ViewRewardToken[] = [
    { symbol: "Staking Yield", apr: stakingYield, logo: chartIcon },
    { symbol: "Restaking Yield", apr: restakingYield, logo: kingIcon },
    ...(fuulAPR ? [{ symbol: "Rewards APR", apr: fuulAPR, logo: seamIcon }] : []),
    { symbol: "Borrow Rate", apr: borrowAPYFormatted, logo: chartIcon },
  ];

  const pointsPrograms: ViewRewardToken[] = [
    // King points are not available for now
    // {
    //   symbol: "KING points",
    //   points: formatFetchNumberToViewNumber(
    //     { value: targetLeverage ? 1 * targetLeverage : undefined, symbol: "x" },
    //     decimalsOptions
    //   ),
    //   logo: kingIcon,
    // },
    {
      symbol: "Etherfi points",
      points: formatFetchNumberToViewNumber(
        { value: targetLeverage ? 2 * targetLeverage : undefined, symbol: "x" },
        decimalsOptions
      ),
      logo: weETHIcon,
    },
  ];

  yieldBreakdown.push(...pointsPrograms);

  return {
    estimateNetYield,
    stakingYield,
    borrowRate: borrowAPYFormatted,
    restakingYield,
    rewardsYield: fuulAPR,
    yieldBreakdown,
    pointsPrograms,
  };
}
