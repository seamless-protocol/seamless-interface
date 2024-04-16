import { Address } from "viem";
import {
  Buttonv2,
  FlexCol,
  FlexRow,
  Icon,
  TableCell,
  TableRow,
  Typography,
  useFullTokenData,
} from "../../../../../../shared";
import { useFetchViewSupplyIncentives } from "../../../../../state/lending-borrowing/hooks/useFetchViewSupplyIncentives";
import { getTokenTitle } from "../../../../../../shared/state/meta-data-queries/useTokenDescription";
import { Tag } from "../earn-tab/Tag";
import { AssetApy } from "../../../../components/AssetApy";
import { IncentivesButton } from "../../../../components/IncentivesButton";
import { IncentivesDetailCard } from "../../../../components/IncentivesDetailCard";
import { CurrentBalance } from "./CurrentBalance";

export const MyStrategiesDesktopTableRow: React.FC<{
  asset: Address;
  strategy?: Address;
  hideBorder?: boolean;
}> = ({ asset, strategy, hideBorder }) => {
  const isStrategy = !!strategy;

  const {
    data: { logo: icon, name, symbol },
  } = useFullTokenData(asset);

  // TODO: Don't fetch this when row is for strategy, remove when infrastructure for enabling and disabling queries is ready
  const { data: supplyIncentives } = useFetchViewSupplyIncentives(asset);

  return (
    <div className="py-4 border-solid border-b border-b-navy-100">
      <TableRow className="md:grid grid-cols-12" hideBorder={hideBorder}>
        <TableCell alignItems="items-start col-span-4">
          <FlexRow className="gap-4 items-start">
            <Icon width={40} src={icon} alt={icon || ""} />
            <FlexCol className="gap-2 text-start">
              <FlexCol className="gap-[2px]">
                <Typography type="bold3">{getTokenTitle(asset, isStrategy)}</Typography>
                <Typography type="regular1">{name}</Typography>
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

        <TableCell className="col-span-2">
          <AssetApy asset={asset} isStrategy={isStrategy} typography="bold3" />
          {!strategy && !!supplyIncentives.totalApr.viewValue && (
            <IncentivesButton {...supplyIncentives}>
              <IncentivesDetailCard {...supplyIncentives} assetSymbol={symbol} />
            </IncentivesButton>
          )}
        </TableCell>

        <TableCell className="col-span-">
          <input type="checkbox" checked={!isStrategy} className="toggle" onChange={() => {}} />
        </TableCell>

        <TableCell className="col-span-3" alignItems="items-end">
          <FlexRow className="gap-2">
            <Buttonv2 className="w-24 h-7">
              <Typography type="bold3">Add</Typography>
            </Buttonv2>
            <Buttonv2 className="w-24 h-7 border border-1 border-navy-1000" variant="text">
              <Typography type="bold3">Remove</Typography>
            </Buttonv2>
          </FlexRow>
        </TableCell>
      </TableRow>
    </div>
  );
};
