import { Address } from "viem";
import { TableRow, TableCell, Icon, FlexCol, Typography, FlexRow } from "../../../../../../../shared";
import { useFullTokenData } from "../../../../../../statev3/common/meta-data-queries/useFullTokenData";
import { RandomNumber } from "../../../../../components/specific-components/RandomNumber";
import { AprTooltip } from "../../../../../components/incentives/AprTooltip";
import { Tag } from "../../../../../components/asset-data/Tag";
import { TableButtons } from "./TableButtons";

export const MyTableDesktopRow: React.FC<{
  strategy: Address;
  hideBorder?: boolean;
}> = ({ strategy, hideBorder }) => {
  const {
    data: { logo: icon, name, description, tags },
  } = useFullTokenData(strategy);

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
        <FlexRow>{tags?.map((tag) => <Tag key={tag} tag={tag} />)}</FlexRow>
      </TableCell>
      <TableCell className="col-span-3">
        <RandomNumber symbol="$" />
      </TableCell>
      <TableCell className="col-span-3">
        <RandomNumber symbol="%" symbolPosition="after" />
      </TableCell>
      <TableCell className="col-span-3">
        <AprTooltip asset={strategy} />
      </TableCell>
      <TableCell className="col-span-5 flex justify-evenly items-center">
        <TableButtons strategy={strategy} isStrategy />
      </TableCell>
    </TableRow>
  );
};
