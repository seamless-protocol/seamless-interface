import {
  TableRow,
  TableCell,
  Typography,
  DisplayMoney,
  ImageGroup,
  DisplayTokenAmount,
  DisplayText,
  FlexCol,
  FlexRow,
  Icon,
  ViewBigInt,
} from "@shared";
import { MorphoAsset } from "../../../../../../data/morpho/types/MorphoAsset";
import { Curator } from "../../../../../../data/morpho/types/Curator";
import { NetApyData } from "../../../../../../data/morpho/types/UserReward";

import { MorphoAprTooltip } from "../../../../../components/tooltip/MorphoAprTooltip";
import { Address } from "viem";

interface VaultProps {
  name: string;
  vaultAddress: Address;
  asset: MorphoAsset;
  totalAssets: ViewBigInt;
  totalAssetsUsd: string;
  netApyData?: NetApyData;
  curator?: Curator;
  collateralLogos: (string | undefined)[];
  hideBorder?: boolean;
  selected?: boolean;
}

export const VaultDesktopRow: React.FC<VaultProps> = ({
  vaultAddress,
  name,
  asset,
  totalAssetsUsd,
  totalAssets,
  netApyData,
  curator,
  collateralLogos,
  hideBorder,
  selected,
}) => {
  return (
    <TableRow
      className={`hidden md:grid grid-cols-6 cursor-pointer items-center border-solid min-h-[148px] ${hideBorder ? "" : "border-b border-b-navy-100"
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
        <MorphoAprTooltip netApyData={netApyData} vaultAddress={vaultAddress} />
      </TableCell>
      <TableCell className="col-span-1">
        <FlexRow className="gap-1">
          <Icon width={12} src={curator?.icon || ""} alt="Curator Logo" />
          <Typography type="bold3">{curator?.name}</Typography>
        </FlexRow>
      </TableCell>
      <TableCell className="col-span-1">
        <ImageGroup images={collateralLogos} imageStyle="w-5 h-5 rounded-full" spacing="-space-x-3" />
      </TableCell>
    </TableRow>
  );
};
