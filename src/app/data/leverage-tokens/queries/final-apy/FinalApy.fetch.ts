// fetchLeverageTokenApys.ts
import { Address } from "viem";
import { ViewNumber, formatFetchNumberToViewNumber, RewardToken } from "@shared";
import { fetchEtherFiApy } from "../etherfi-apy/EtherfiApy.fetch";
import { fetchBorrowApy } from "../borrow-apy/borrow-apy.fetch";
import chartIcon from "@assets/common/chart.svg";
import KINGIcon from "@assets/logos/KING-icon.svg";
import etherFiIcon from "@assets/logos/etherfi-icon.svg";
import seamIcon from "@assets/tokens/seam.svg";
import { fetchConversionByProgramId } from "../../../../statev3/fuul/queries/fetch-conversions/ConversionsApy.mapper";
import { PointsProgram } from "../../../../statev3/settings/config";

export interface LeverageTokenApys {
  estimatedAPY: ViewNumber;
  yieldAPY: ViewNumber;
  borrowAPY: ViewNumber;
  restakingAPY: ViewNumber;
  fuulAPY: ViewNumber | null;
  apyBreakdown: RewardToken[];
  pointsPrograms: PointsProgram[];
}

export async function fetchLeverageTokenApys(address: Address, fuulProgramId: string): Promise<LeverageTokenApys> {
  const [etherfiData, borrowRaw, fuulAprData] = await Promise.all([
    fetchEtherFiApy(),
    fetchBorrowApy(address),
    fetchConversionByProgramId(fuulProgramId),
  ]);

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

  const pointsPrograms: PointsProgram[] = [
    { symbol: "KING points", viewValue: "1x", icon: KINGIcon },
    { symbol: "Etherfi points", viewValue: "2x", icon: etherFiIcon },
  ];

  return { estimatedAPY, yieldAPY, borrowAPY, restakingAPY, fuulAPY, apyBreakdown, pointsPrograms };
}
