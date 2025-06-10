import { Displayable, DisplayText, FlexCol, FlexRow, useToken } from "@shared";

import { LeverageToken } from "@app/data/leverage-tokens/queries/all-leverage-tokens/leverageTokens";
import { IncentivesButton } from "../../../../components/tooltip/AprTooltip";
import { IncentivesDetailCard } from "../../../../components/tooltip/IncentivesDetailCard";
import { useFetchLeverageTokenYields } from "../../../../../data/leverage-tokens/queries/leverage-token-yields/LeverageTokenYields.hook";

export const LeverageTokenHeading: React.FC<{
  leverageToken: Displayable<LeverageToken | undefined>;
}> = ({ leverageToken }) => {
  const { data: { additionalData: { description = undefined } = {} } = {}, ...rest } = leverageToken;

  const { data: tokenData, ...tokenDataRest } = useToken(leverageToken?.data?.address);

  const { data: yields, ...yieldsRest } = useFetchLeverageTokenYields(leverageToken?.data?.address);

  return (
    <FlexCol>
      <div className="flex md:flex-row flex-col-reverse md:items-center gap-4">
        <DisplayText viewValue={tokenData.name} {...tokenDataRest} typography="bold7" />

        <FlexRow className="md:items-center gap-4">
          <div className="h-auto mt-[2px]">
            <IncentivesButton
              totalApr={{
                ...yields?.estimateNetYield,
              }}
              rewardTokens={yields?.yieldBreakdown}
              {...yieldsRest}
            >
              <IncentivesDetailCard
                totalApr={{
                  ...yields?.estimateNetYield,
                }}
                rewardTokens={yields?.yieldBreakdown}
                {...yieldsRest}
              />
            </IncentivesButton>
          </div>
        </FlexRow>
      </div>
      {description && <DisplayText {...rest} typography="regular5" text={description} />}
    </FlexCol>
  );
};
