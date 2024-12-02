import { useParams } from "react-router-dom";
import { Address } from "viem";
import { useFetchFullStrategyData } from "../../../../../statev3/metadata/FullStrategyData.all";
import { DisplayNumber, DisplayText, FlexCol, FlexRow, Typography } from "@shared";
import { useFetchFormattedStrategyHistoricReturn } from "../../../../../statev3/hooks/StrartegyReturn.hook";
import { SignIndicatingElement } from "../../../../components/other/SignIndicatingElement";
import { StrategyIncentivesButton } from "../../../../components/tooltip/AprTooltip";

export const StrategyHeading = () => {
  const { address } = useParams();
  const strategy = address as Address | undefined;

  const { data: strategyData } = useFetchFullStrategyData(strategy);

  const { data: apy, ...apyRest } = useFetchFormattedStrategyHistoricReturn(strategy);

  return (
    <FlexCol>
      <div className="flex md:flex-row flex-col-reverse md:items-center gap-4">
        <DisplayText viewValue={strategyData?.name} typography="bold7" />

        <FlexRow className="md:items-center gap-4">
          <div className="flex w-auto">
            <SignIndicatingElement
              dislayable={{
                ...apyRest,
                data: apy,
              }}
            >
              <DisplayNumber typography="bold3" {...apy} {...apyRest} />
            </SignIndicatingElement>
          </div>

          {strategy && (
            <div className="h-auto mt-[2px]">
              <StrategyIncentivesButton strategy={strategy} />
            </div>
          )}
        </FlexRow>
      </div>
      {strategyData?.description && <Typography type="regular5">{strategyData?.description}</Typography>}
    </FlexCol>
  );
};
