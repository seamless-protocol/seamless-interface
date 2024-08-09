import { Address } from "viem";
import { TableRow, TableCell, FlexRow, Icon, FlexCol, Typography } from "../../../../../../../shared";
import { useFullTokenData } from "../../../../../../statev3/common/meta-data-queries/useFullTokenData";
import { Tag } from "../../../../../components/asset-data/Tag";
import { RandomNumber } from "../../../../../components/specific-components/RandomNumber";

import polygonSvg from "@assets/common/polygon.svg";
import { StrategyTvl } from "../../../../../components/asset-data/AssetTvl";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { StrategyApr } from "../../../../../components/asset-data/AssetApr";

export const MyStrategiesDesktopTableRow: React.FC<{
  strategy: Address;
  hideBorder?: boolean;
}> = ({ strategy, hideBorder }) => {
  const {
    data: { logo: icon, name, description, tags },
  } = useFullTokenData(strategy);

  return (
    <div
      className={`hidden cursor-pointer md:flex items-center border-solid min-h-[148px] ${
        hideBorder ? "" : "border-b border-b-navy-100"
      }`}
    >
      <TableRow className="md:grid grid-cols-7 relative">
        <TableCell alignItems="items-center col-span-2 pr-6">
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

        <TableCell className="col-span-1">
          <FlexRow>{tags?.map((tag) => <Tag key={tag} tag={tag} />)}</FlexRow>
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
            <StrategyApr asset={strategy} isStrategy />
          </div>
        </TableCell>
        <TableCell className="col-span-1">
          <StrategyTvl subStrategy={strategy} />
        </TableCell>

        <ChevronRightIcon width={20} className="absolute right-6" />
      </TableRow>
    </div>
  );
};
