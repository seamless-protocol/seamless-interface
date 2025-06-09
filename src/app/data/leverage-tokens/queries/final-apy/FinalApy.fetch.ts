// fetchLeverageTokenApys.ts
import { Address } from "viem";
import { ViewNumber, formatFetchNumberToViewNumber, RewardToken } from "@shared";
import { fetchEtherFiApy } from "../etherfi-apy/EtherfiApy.fetch";
import { fetchBorrowApy } from "../borrow-apy/borrow-apy.fetch";
import chartIcon from "@assets/common/chart.svg";
import KINGIcon from "@assets/logos/KING-icon.svg";
import seamIcon from "@assets/tokens/seam.svg";
import { fetchConversionByProgramId } from "../../../../statev3/fuul/queries/fetch-conversions/ConversionsApy.mapper";

export interface LeverageTokenApys {
  estimatedAPY: ViewNumber;
  yieldAPY: ViewNumber;
  borrowAPY: ViewNumber;
  restakingAPY: ViewNumber;
  fuulAPY: ViewNumber | null;
  apyBreakdown: RewardToken[];
}

export async function fetchLeverageTokenApys(address: Address, fuulProgramId: string): Promise<LeverageTokenApys> {
  // Prepare promises, ensuring borrow resolves to a number (never undefined)
  const etherfiPromise = fetchEtherFiApy();
  const borrowPromise = fetchBorrowApy(address);
  const fuulPromise = fetchConversionByProgramId(fuulProgramId);

  // Destructure as a fixed tuple to satisfy TypeScript
  const [etherfiData, borrowRaw, fuulAprData] = await Promise.all([
    etherfiPromise,
    borrowPromise,
    fuulPromise,
  ] as const);

  const yieldAPY = etherfiData.apyView;
  const restakingAPY = etherfiData.restakingAPy;
  const borrowAPY = formatFetchNumberToViewNumber({ value: borrowRaw, symbol: "%" });
  const fuulAPY = fuulAprData?.fuulApr ?? null;

  const estimatedAPY =
    yieldAPY.value != null && fuulAPY?.value != null && borrowRaw != null
      ? formatFetchNumberToViewNumber({
          value: yieldAPY.value + fuulAPY.value - borrowRaw,
          symbol: "%",
        })
      : formatFetchNumberToViewNumber({ value: undefined, symbol: "%" });

  const apyBreakdown: RewardToken[] = [
    { symbol: "Native APY", apr: yieldAPY, logo: chartIcon },
    { symbol: "Borrow APY", apr: borrowAPY, logo: chartIcon },
    { symbol: "Restaking APY", apr: restakingAPY, logo: KINGIcon },
  ];
  if (fuulAPY) {
    apyBreakdown.push({ symbol: "Seam APY", apr: fuulAPY, logo: seamIcon });
  }

  return { estimatedAPY, yieldAPY, borrowAPY, restakingAPY, fuulAPY, apyBreakdown };
}
