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
} from "@shared";
import { SimpleVaultData } from "../../../../../../statev3/morpho/types/SimpleVaultData";

interface VaultProps extends SimpleVaultData {
  hideBorder?: boolean;
}

export const VaultDesktopRow: React.FC<VaultProps> = ({
  name,
  underlyingTokenData,
  totalAssetsUsd,
  totalSupplyFormatted,
  netApyFormatted,
  curator,
  feePercentage,
  collateralLogos,
  hideBorder,
}) => {
  return (
    <TableRow
      className={`hidden md:grid grid-cols-7 cursor-pointer items-center border-solid min-h-[148px] ${
        hideBorder ? "" : "border-b border-b-navy-100"
      }`}
    >
      <TableCell alignItems="items-start col-span-2 pr-6">
        <FlexRow className="gap-4 items-center max-w-full">
          <Icon width={48} src={underlyingTokenData.logo || ""} alt="logo" />
          <FlexCol className="gap-2 text-start max-w-full">
            <FlexCol className="gap-[2px] max-w-full">
              <DisplayText typography="bold3" viewValue={name} />
              <DisplayText typography="regular1" viewValue={underlyingTokenData?.symbol} />
            </FlexCol>
          </FlexCol>
        </FlexRow>
      </TableCell>
      <TableCell className="col-span-1">
        <DisplayTokenAmount {...totalSupplyFormatted} typography="bold3" />

        <DisplayMoney typography="medium1" {...totalAssetsUsd} className="text-primary-600" />
      </TableCell>
      <TableCell className="col-span-1">
        <DisplayPercentage viewValue={netApyFormatted} typography="bold3" />
      </TableCell>
      <TableCell className="col-span-1">
        <Typography type="bold3">{curator}</Typography>
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
