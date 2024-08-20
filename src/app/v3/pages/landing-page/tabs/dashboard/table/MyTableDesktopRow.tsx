import { Address } from "viem";
import { TableRow, TableCell, Icon, FlexCol, Typography, FlexRow } from "@shared";

import { TableButtons } from "./TableButtons";
import { RandomNumber } from "../../../../../components/other/RandomNumber";
import { stateMock } from "../../../mocks";

import ilmIcon from "@assets/ilms/ethLong-ilm.svg";
import { Tag } from "../../../../../components/strategy-data/Tag";

export const MyTableDesktopRow: React.FC<{
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
      // className="hidden md:grid grid-cols-22 gap-4 py-4 border-b border-gray-200"
      className={`hidden md:grid grid-cols-22 cursor-pointer items-center border-solid min-h-[148px] ${
        hideBorder ? "" : "border-b border-b-navy-100"
      }`}
    >
      <TableCell alignItems="items-center col-span-6 pr-6">
        <FlexRow className="gap-4 items-center ">
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
        <Tag tag="Staking" />
      </TableCell>
      <TableCell className="col-span-3">
        <RandomNumber symbol="$" />
      </TableCell>
      <TableCell className="col-span-3">
        <RandomNumber symbol="%" symbolPosition="after" />
      </TableCell>
      <TableCell className="col-span-3">
        <RandomNumber symbol="%" symbolPosition="after" />
      </TableCell>
      <TableCell className="col-span-5 flex justify-evenly items-center">
        <TableButtons strategy={strategy} isStrategy />
      </TableCell>
    </TableRow>
  );
};
