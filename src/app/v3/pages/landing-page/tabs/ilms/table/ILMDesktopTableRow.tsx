import { Address } from "viem";

import polygonSvg from "@assets/common/polygon.svg";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { TableRow, TableCell, FlexRow, Icon, FlexCol, Typography } from "@shared";
import { RandomNumber } from "../../../../../components/other/RandomNumber";
import { Tag } from "../../../../../components/strategy-data/Tag";
import { TagType } from "../../../../../../statev3/common/types/StateTypes";

import ilmIcon from "@assets/ilms/ethLong-ilm.svg";
import { stateMock } from "../../../mocks";

export const ILMDesktopTableRow: React.FC<{
  strategy: Address;
  hideBorder?: boolean;
}> = ({ strategy, hideBorder }) => {
  // todo use useFullTokenData instead of mock
  const strategyMock = stateMock.data.find((s) => s.address === strategy);
  const name = strategyMock?.name;
  const description = strategyMock?.description;
  const icon = ilmIcon;
  const tag = "Staking" as TagType;

  return (
    <div
      className={`hidden cursor-pointer md:grid items-center border-solid min-h-[148px] ${
        hideBorder ? "" : "border-b border-b-navy-100"
      }`}
    >
      <TableRow className="md:grid grid-cols-7 relative">
        <TableCell alignItems="items-start col-span-2 pr-6">
          <FlexRow className="gap-4 items-start ">
            <Icon width={64} src={icon} alt="logo" />
            <FlexCol className="gap-2 text-start">
              <FlexCol className="gap-[2px]">
                <Typography type="bold3">{name}</Typography>
                <Typography type="regular1">{description}</Typography>
              </FlexCol>
            </FlexCol>
          </FlexRow>
        </TableCell>

        <TableCell className="col-span-1">
          <FlexRow>
            <Tag key={tag} tag={tag} />
          </FlexRow>
        </TableCell>
        <TableCell className="col-span-1">
          <RandomNumber typography="bold3" className="text-primaryv2-400" symbol="$" />
        </TableCell>

        <TableCell className="col-span-1">
          <FlexRow className="items-center gap-1">
            <Icon src={polygonSvg} alt="polygon" width={12} height={12} />
            <RandomNumber typography="bold3" className="text-successv2-900" symbol="%" symbolPosition="after" />
          </FlexRow>
        </TableCell>
        <TableCell className="col-span-1">
          <div className="flex">
            <RandomNumber symbol="%" symbolPosition="after" />
          </div>
        </TableCell>
        <TableCell className="col-span-1">
          <RandomNumber typography="bold3" symbol="$" />
        </TableCell>

        <ChevronRightIcon width={20} className="absolute right-6" />
      </TableRow>
    </div>
  );
};
