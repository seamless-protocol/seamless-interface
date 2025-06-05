import { Displayable, DisplayNumber, DisplayText, FlexCol, FlexRow, useToken } from "@shared";

import { LeverageToken } from "@app/data/leverage-tokens/queries/all-leverage-tokens/mockLeverageTokens";
import { SignIndicatingElement } from "../../../../components/other/SignIndicatingElement";
import { IncentivesButton } from "../../../../components/tooltip/AprTooltip";
import { IncentivesDetailCard } from "../../../../components/tooltip/IncentivesDetailCard";

export const LeverageTokenHeading: React.FC<{
  leverageToken: Displayable<LeverageToken | undefined>;
}> = ({ leverageToken }) => {
  const {
    data: {
      apy: { estimatedAPY = undefined, rewardTokens = [] } = {},
      additionalData: { description = undefined } = {},
    } = {},
    ...rest
  } = leverageToken;

  const { data: tokenData, ...tokenDataRest } = useToken(leverageToken?.data?.address);

  return (
    <FlexCol>
      <div className="flex md:flex-row flex-col-reverse md:items-center gap-4">
        <DisplayText viewValue={tokenData.name} {...tokenDataRest} typography="bold7" />

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
                assetSymbol={tokenData.symbol}
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
