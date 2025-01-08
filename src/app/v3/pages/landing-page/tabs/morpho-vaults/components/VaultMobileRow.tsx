import {
  Typography,
  DisplayMoney,
  DisplayPercentage,
  ImageGroup,
  DisplayTokenAmount,
  FlexCol,
  FlexRow,
  Icon,
} from "@shared";
import { SimpleVaultData } from "../../../../../../statev3/morpho/types/SimpleVaultData";

interface VaultProps extends SimpleVaultData {}

export const VaultMobileRow: React.FC<VaultProps> = ({
  name,
  underlyingTokenData,
  totalAssetsUsd,
  totalSupplyFormatted,
  netApyFormatted,
  curator,
  feePercentage,
  collateralLogos,
}) => {
  return (
    <div className="flex flex-col md:hidden p-4 m-2 bg-white rounded-lg shadow">
      <FlexRow className="items-center gap-4 mb-4">
        <Icon width={30} src={underlyingTokenData?.logo || ""} alt="Strategy Logo" />
        <FlexCol>
          <Typography type="bold3">{name}</Typography>
          <Typography type="regular1">{underlyingTokenData?.symbol}</Typography>
        </FlexCol>
      </FlexRow>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Typography type="regular1">Total Supply:</Typography>
          <FlexCol className="items-end">
            <DisplayTokenAmount {...totalSupplyFormatted} typography="bold3" />

            <DisplayMoney typography="medium1" {...totalAssetsUsd} className="text-primary-600" />
          </FlexCol>
        </div>
        <div className="flex justify-between">
          <Typography type="regular1">Net APY:</Typography>
          <DisplayPercentage viewValue={netApyFormatted} typography="bold3" />
        </div>
        <div className="flex justify-between">
          <Typography type="regular1">Curator:</Typography>
          <Typography type="bold3">{curator}</Typography>
        </div>
        <div className="flex justify-between">
          <Typography type="regular1">Performance Fee:</Typography>
          <Typography type="bold3">{feePercentage}</Typography>
        </div>
        <div className="flex justify-between items-center">
          <Typography type="regular1">Collateral:</Typography>
          <ImageGroup images={collateralLogos} imageStyle="w-3 h-3 rounded-full" spacing="-space-x-2 " />
        </div>
      </div>
    </div>
  );
};
