import { Displayable, DisplayNumber, DisplayText, FlexCol, FlexRow } from "@shared";

import { SignIndicatingElement } from "../../../../components/other/SignIndicatingElement";
import { IncentivesButton } from "../../../../components/tooltip/AprTooltip";
import { LeverageToken } from "../../../../../data/leverage-tokens/queries/all-leverage-tokens/FetchAllLeverageTokens";
import { IncentivesDetailCard } from "../../../../components/tooltip/IncentivesDetailCard";

export const LeverageTokenHeading: React.FC<{
  leverageToken: Displayable<LeverageToken | undefined>;
}> = ({ leverageToken }) => {
  const {
    data: {
      tokenData: { name = undefined, symbol = undefined } = {},
      apy: { estimatedAPY = undefined, rewardTokens = [] } = {},
      additionalData: { description = undefined } = {},
    } = {},
    ...rest
  } = leverageToken;

  return (
    <FlexCol>
      <div className="flex md:flex-row flex-col-reverse md:items-center gap-4">
        <DisplayText viewValue={name} {...rest} typography="bold7" />

        <FlexRow className="md:items-center gap-4">
          <div className="flex w-auto">
            <SignIndicatingElement
              dislayable={{
                ...rest,
                data: estimatedAPY,
              }}
            >
              <DisplayNumber typography="bold3" {...estimatedAPY} {...rest} />
            </SignIndicatingElement>
          </div>

          <div className="h-auto mt-[2px]">
            <IncentivesButton
              totalApr={{
                ...estimatedAPY,
              }}
              rewardTokens={rewardTokens}
              {...rest}
            >
              <IncentivesDetailCard
                assetSymbol={symbol}
                totalApr={{
                  ...estimatedAPY,
                }}
                rewardTokens={rewardTokens}
                {...rest}
              />
            </IncentivesButton>
          </div>
        </FlexRow>
      </div>
      {description && <DisplayText {...rest} typography="regular5" text={description} />}
    </FlexCol>
  );
};
