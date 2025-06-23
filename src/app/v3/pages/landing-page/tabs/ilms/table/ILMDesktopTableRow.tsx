import { ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  TableRow,
  TableCell,
  FlexRow,
  Icon,
  FlexCol,
  DisplayMoney,
  DisplayText,
  Displayable,
  DisplayTokenAmount,
} from "@shared";

import { LeverageToken } from "@app/data/leverage-tokens/queries/all-leverage-tokens/leverageTokens";
import { useFullTokenData } from "../../../../../../data/common/meta-data-queries/useFullTokenData";
import { IncentivesButton } from "../../../../../components/tooltip/AprTooltip";
import { IncentivesDetailCard } from "../../../../../components/tooltip/IncentivesDetailCard";
import { useFetchLeverageTokenYields } from "../../../../../../data/leverage-tokens/queries/leverage-token-yields/LeverageTokenYields.hook";

export const LeverageTokenDesktopTableRow: React.FC<{
  leverageToken: Displayable<LeverageToken>;
  hideBorder?: boolean;
  selected?: boolean;
}> = ({ leverageToken, hideBorder, selected }) => {
  const {
    data: {
      additionalData: { description },
      tvl,
    },
    ...rest
  } = leverageToken;

  const {
    data: { name, logo },
  } = useFullTokenData(leverageToken.data?.address);

  const { data: yields, ...yieldsRest } = useFetchLeverageTokenYields(leverageToken.data.address);

  return (
    <div
      className={`hidden cursor-pointer md:grid items-center border-solid min-h-[148px] ${hideBorder ? "" : "border-b border-b-navy-100"
        } ${selected ? "bg-neutral-100" : ""}`}
    >
      <TableRow className="md:grid grid-cols-4 relative">
        <TableCell alignItems="items-start col-span-2 pr-6">
          <FlexRow className="gap-4 items-center">
            <Icon width={64} src={logo} alt="logo" isLoading={rest.isLoading} isFetched={rest.isFetched} />
            <FlexCol className="gap-2 text-start">
              <FlexCol className="gap-[2px]">
                <DisplayText typography="bold3" viewValue={name} {...rest} />
                <DisplayText typography="regular1" viewValue={description} {...rest} />
              </FlexCol>
            </FlexCol>
          </FlexRow>
        </TableCell>

        <TableCell className="col-span-1">
          <DisplayTokenAmount typography="bold3" {...tvl?.tokenAmount} {...rest} />

          <DisplayMoney typography="medium1" {...tvl?.dollarAmount} {...rest} className="text-primary-600" />
        </TableCell>

        <TableCell className="col-span-1">
          <IncentivesButton
            totalApr={{ ...yields?.estimateNetYield }}
            rewardTokens={yields?.yieldBreakdown}
            {...yieldsRest}
          >
            <IncentivesDetailCard
              totalApr={yields?.estimateNetYield}
              rewardTokens={yields?.yieldBreakdown}
              {...yieldsRest}
            />
          </IncentivesButton>
        </TableCell>

        <ChevronRightIcon width={20} className="absolute right-6" />
      </TableRow>
    </div>
  );
};
