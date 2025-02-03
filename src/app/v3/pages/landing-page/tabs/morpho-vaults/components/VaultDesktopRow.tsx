import {
  TableRow,
  TableCell,
  Typography,
  DisplayMoney,
  DisplayPercentage,
  ImageGroup,
  DisplayTokenAmount,
  DisplayText,
  FlexCol,
  FlexRow,
  Icon,
  ViewBigInt,
} from "@shared";
import { MorphoAsset } from "../../../../../../statev3/morpho/types/MorphoAsset";
import { Curator } from "../../../../../../statev3/morpho/types/Curator";
import { NetApyData } from "../../../../../../statev3/morpho/types/UserReward";
import { IncentivesDetailCard } from "../../../../../components/tooltip/IncentivesDetailCard";

import chartIcon from "@assets/common/chart.svg";
import { IncentivesButton } from "../../../../../components/tooltip/AprTooltip";

interface VaultProps {
  name: string;
  vaultAddress: string;
  asset: MorphoAsset;
  totalAssets: ViewBigInt;
  totalAssetsUsd: string;
  netApyData?: NetApyData;
  curator?: Curator;
  feePercentage: string;
  collateralLogos: (string | undefined)[];
  hideBorder?: boolean;
  selected?: boolean;
}

export const VaultDesktopRow: React.FC<VaultProps> = ({
  name,
  asset,
  totalAssetsUsd,
  totalAssets,
  netApyData,
  curator,
  feePercentage,
  collateralLogos,
  hideBorder,
  selected,
}) => {
  const rewardsOnly = netApyData?.rewards
    ? [...netApyData.rewards.map((reward) => ({
      symbol: reward.asset?.symbol || "",
      logo: reward.asset?.logoURI || "",
      apr: reward.totalAprPercent || "0",
    })),]
    : [];
  const rewardsWithRest = [
    {
      symbol: "Rate",
      apr: netApyData?.rest,
      logo: chartIcon,
    },
    ...rewardsOnly,]

  return (
    <TableRow
      className={`hidden md:grid grid-cols-7 cursor-pointer items-center border-solid min-h-[148px] ${hideBorder ? "" : "border-b border-b-navy-100"
        } ${selected ? "bg-neutral-100" : ""}`}
    >
      <TableCell alignItems="items-start col-span-2 pr-6">
        <FlexRow className="gap-4 items-center max-w-full">
          <Icon width={48} src={asset.logoURI || ""} alt="logo" />
          <FlexCol className="gap-2 text-start max-w-full">
            <FlexCol className="gap-[2px] max-w-full">
              <DisplayText typography="bold3" viewValue={name} />
              <DisplayText typography="regular1" viewValue={asset?.symbol} />
            </FlexCol>
          </FlexCol>
        </FlexRow>
      </TableCell>
      <TableCell className="col-span-1">
        <DisplayTokenAmount {...totalAssets} typography="bold3" />

        <DisplayMoney typography="medium1" viewValue={totalAssetsUsd} className="text-primary-600" />
      </TableCell>
      <TableCell className="col-span-1">

        <IncentivesButton rewardTokens={rewardsOnly} totalApr={netApyData?.netApy}>
          <IncentivesDetailCard totalApr={
            netApyData?.netApy
          } rewardTokens={rewardsWithRest} />
        </IncentivesButton>

      </TableCell>
      <TableCell className="col-span-1">
        <FlexRow className="gap-1">
          <Icon width={12} src={curator?.icon || ""} alt="Curator Logo" />
          <Typography type="bold3">{curator?.name}</Typography>
        </FlexRow>
      </TableCell>
      <TableCell className="col-span-1">
        <DisplayPercentage viewValue={feePercentage} typography="bold3" />
      </TableCell>
      <TableCell className="col-span-1">
        <ImageGroup images={collateralLogos} imageStyle="w-5 h-5 rounded-full" spacing="-space-x-3" />
      </TableCell>
    </TableRow>
  );
};
