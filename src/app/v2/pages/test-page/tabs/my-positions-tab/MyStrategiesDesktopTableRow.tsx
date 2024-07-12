import { Address } from "viem";
import { FlexCol, FlexRow, Icon, TableCell, TableRow, Typography } from "../../../../../../shared";
import { Tag } from "../../../../components/asset-data/Tag";
import { AssetApy } from "../../../../components/asset-data/AssetApy";
import { AprTooltip } from "../../../../components/incentives/AprTooltip";
import { CurrentBalance } from "./CurrentBalance";
import { TableButtons } from "./TableButtons";
import { useFullTokenData } from "../../../../../state/common/meta-data-queries/useFullTokenData";

export const MyStrategiesDesktopTableRow: React.FC<{
  asset: Address;
  strategy?: Address;
  hideBorder?: boolean;
}> = ({ asset, strategy, hideBorder }) => {
  const isStrategy = !!strategy;

  const {
    data: { logo: icon, name, subTitle },
  } = useFullTokenData(isStrategy ? strategy : asset);

  return (
    <div className="hidden md:block py-4 border-solid border-b border-b-navy-100">
      <TableRow className="md:grid grid-cols-12" hideBorder={hideBorder}>
        <TableCell alignItems="items-start col-span-4">
          <FlexRow className="gap-4 items-start">
            <Icon width={40} src={icon} alt="logo" />
            <FlexCol className="gap-2 text-start">
              <FlexCol className="gap-[2px]">
                <Typography type="bold3">{name}</Typography>
                <Typography type="regular1">{subTitle}</Typography>
              </FlexCol>
              <FlexRow>
                <Tag tag={strategy ? "ILM" : "LEND"} />
              </FlexRow>
            </FlexCol>
          </FlexRow>
        </TableCell>

        <TableCell className="col-span-2">
          <CurrentBalance asset={isStrategy ? strategy : asset} isStrategy={isStrategy} />
        </TableCell>

        <TableCell className="col-span-3">
          <AssetApy asset={asset} subStrategy={strategy} isStrategy={isStrategy} typography="bold3" />
          <AprTooltip asset={isStrategy ? strategy : asset} isStrategy={isStrategy} />
        </TableCell>

        <TableCell className="col-span-3" alignItems="items-center">
          <TableButtons asset={asset} subStrategy={strategy} isStrategy={isStrategy} />
        </TableCell>
      </TableRow>
    </div>
  );
};
