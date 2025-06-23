import React from "react";

import { FlexRow, FlexCol, Icon, DisplayText, DisplayMoney, Displayable } from "@shared";

import { IncentivesButton } from "@app/v3/components/tooltip/AprTooltip";
import { IncentivesDetailCard } from "@app/v3/components/tooltip/IncentivesDetailCard";

import { LeverageToken } from "@app/data/leverage-tokens/queries/all-leverage-tokens/leverageTokens";
import { useFullTokenData } from "../../../../../../data/common/meta-data-queries/useFullTokenData";
import { useFetchLeverageTokenYields } from "../../../../../../data/leverage-tokens/queries/leverage-token-yields/LeverageTokenYields.hook";

export const LeverageTokenMobileTableRow: React.FC<{
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
    data: { name, symbol, logo },
  } = useFullTokenData(leverageToken.data?.address);

  const { data: yields, ...yieldsRest } = useFetchLeverageTokenYields(leverageToken.data.address);

  return (
    <div
      className={`
        flex flex-col md:hidden p-4 mx-2 mb-2 rounded-lg shadow
        ${selected ? "bg-neutral-100" : "bg-white"}
        ${hideBorder ? "" : "border border-b-divider"}
      `}
    >
      <FlexRow className="justify-between mb-2">
        <DisplayText typography="regular2" viewValue={description} {...rest} />
      </FlexRow>

      <FlexRow className="items-center gap-3 mb-4">
        <Icon width={40} src={logo} alt={`${symbol} logo`} isLoading={rest.isLoading} isFetched={rest.isFetched} />
        <FlexCol>
          <DisplayText typography="bold3" viewValue={name} {...rest} />
          <DisplayText typography="regular1" viewValue={symbol} {...rest} />
        </FlexCol>
      </FlexRow>

      <FlexCol className="space-y-3">
        <FlexRow className="justify-between items-center">
          <DisplayText typography="regular1" viewValue="TVL:" {...rest} />
          <DisplayMoney typography="bold3" {...tvl?.dollarAmount} {...rest} />
        </FlexRow>

        <FlexRow className="justify-between items-center">
          <DisplayText typography="regular1" viewValue="Estimated APY:" {...rest} />
          <FlexRow className="items-center gap-1">
            <IncentivesButton
              totalApr={{ ...yields?.estimateNetYield }}
              rewardTokens={yields?.yieldBreakdown}
              {...yieldsRest}
            >
              <IncentivesDetailCard
                totalApr={{ ...yields?.estimateNetYield }}
                rewardTokens={yields?.yieldBreakdown}
                {...yieldsRest}
              />
            </IncentivesButton>
          </FlexRow>
        </FlexRow>
      </FlexCol>
    </div>
  );
};
