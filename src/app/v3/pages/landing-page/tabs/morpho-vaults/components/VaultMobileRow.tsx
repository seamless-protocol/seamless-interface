import { Typography, DisplayMoney, ImageGroup, DisplayTokenAmount, FlexCol, FlexRow, Icon, ViewBigInt } from "@shared";
import { MorphoAsset } from "../../../../../../data/morpho/types/MorphoAsset";
import { Curator } from "../../../../../../data/morpho/types/Curator";
import { NetApyData } from "../../../../../../data/morpho/types/UserReward";
import { MorphoAprTooltip } from "../../../../../components/tooltip/MorphoAprTooltip";
import { Address } from "viem";

interface VaultProps {
  name: string;
  vaultAddress: Address;
  asset: MorphoAsset;
  totalAssetsUsd: string;
  totalAssets: ViewBigInt;
  netApyData?: NetApyData;
  curator?: Curator;
  collateralLogos: (string | undefined)[];
  selected?: boolean;
}

export const VaultMobileRow: React.FC<VaultProps> = ({
  name,
  asset,
  vaultAddress,
  totalAssetsUsd,
  totalAssets,
  netApyData,
  curator,
  collateralLogos,
  selected,
}) => {
  return (
    <div
      className={`flex flex-col md:hidden p-4 m-2 bg-white rounded-lg shadow  ${selected ? "bg-neutral-100" : "bg-white"}`}
    >
      <FlexRow className="items-center gap-4 mb-4">
        <Icon width={30} src={asset?.logoURI || ""} alt="Strategy Logo" />
        <FlexCol>
          <Typography type="bold3">{name}</Typography>
          <Typography type="regular1">{asset?.symbol}</Typography>
        </FlexCol>
      </FlexRow>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <Typography type="regular1">TVL:</Typography>
          <FlexCol className="items-end">
            <DisplayTokenAmount {...totalAssets} typography="bold3" />

            <DisplayMoney typography="medium1" viewValue={totalAssetsUsd} className="text-primary-600" />
          </FlexCol>
        </div>
        <div className="flex justify-between items-center mr-[-6px]">
          <Typography type="regular1">APY:</Typography>
          <MorphoAprTooltip netApyData={netApyData} vaultAddress={vaultAddress} />
        </div>
        <div className="flex justify-between">
          <Typography type="regular1">Curator:</Typography>
          <FlexRow className="gap-1">
            <Icon width={8} src={curator?.icon || ""} alt="Curator Logo" />
            <Typography type="bold3">{curator?.name}</Typography>
          </FlexRow>
        </div>
        <div className="flex justify-between items-center">
          <Typography type="regular1">Collateral:</Typography>
          <ImageGroup images={collateralLogos} imageStyle="w-3 h-3 rounded-full" spacing="-space-x-2 " />
        </div>
      </div>
    </div>
  );
};
