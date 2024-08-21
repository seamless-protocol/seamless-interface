import { Address } from "viem";
import { TableRow, TableCell, Icon, FlexCol, Typography, FlexRow, ImageGroup } from "@shared";

import { TableButtons } from "./TableButtons";
import { RandomNumber } from "../../../../../components/other/RandomNumber";
import { stateMock } from "../../../mocks";
import { Tag } from "../../../../../components/strategy-data/Tag";

import ilmIcon from "@assets/ilms/ethLong-ilm.svg";
import polygonSvg from "@assets/common/polygon.svg";
import { assetLogos } from "@meta";

export const TableDesktopRow: React.FC<{
  strategy: Address;
  hideBorder?: boolean;
}> = ({ strategy, hideBorder }) => {
  // todo use useFullTokenData instead of mock
  const strategyMock = stateMock.data.find((s) => s.address === strategy);
  const name = strategyMock?.name;
  const description = strategyMock?.description;
  const icon = ilmIcon;

  return (
    <TableRow
      className={`hidden md:grid grid-cols-22 cursor-pointer items-center border-solid min-h-[148px] ${
        hideBorder ? "" : "border-b border-b-navy-100"
      }`}
    >
      <TableCell alignItems="items-start col-span-6 pr-6">
        <FlexRow className="gap-4 items-start">
          <Icon width={64} src={icon} alt="logo" />
          <FlexCol className="gap-2 text-start">
            <FlexCol className="gap-[2px]">
              <Typography type="bold3">{name}</Typography>
              <Typography type="regular1">{description}</Typography>
            </FlexCol>
          </FlexCol>
        </FlexRow>
      </TableCell>

      <TableCell className="col-span-2">
        <div>
          <Tag tag="Staking" />
        </div>
      </TableCell>
      <TableCell className="col-span-3">
        <FlexCol>
          <RandomNumber />
          <RandomNumber typography="medium1" symbol="$" className="text-primary-600" />
        </FlexCol>
      </TableCell>
      <TableCell className="col-span-3">
        <FlexCol>
          <FlexRow className="items-center gap-1">
            <Icon src={polygonSvg} alt="polygon" width={12} height={12} />
            <RandomNumber typography="bold3" className="text-success-900" symbol="%" symbolPosition="after" />
          </FlexRow>
          <RandomNumber typography="medium1" symbol="$" className="text-primary-600" />
        </FlexCol>
      </TableCell>
      <TableCell className="col-span-3">
        <FlexCol>
          <RandomNumber symbol="$" />
          <ImageGroup
            imageStyle="w-4"
            spacing="-space-x-3"
            images={[assetLogos.get("SEAM") || "", assetLogos.get("USDC") || ""]}
          />
        </FlexCol>
        {/* assetLogos */}
      </TableCell>
      <TableCell className="col-span-5 flex justify-evenly items-center">
        <TableButtons strategy={strategy} isStrategy />
      </TableCell>
    </TableRow>
  );
};
