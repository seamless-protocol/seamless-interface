import { useParams } from "react-router-dom";
import { Address } from "viem";
import { useFetchFullStrategyData } from "../../../../../statev3/metadata/FullStrategyData.all";
import { DisplayNumber, DisplayText, FlexCol, FlexRow, Typography } from "@shared";
import { useFetchFormattedStrategyHistoricReturn } from "../../../../../statev3/hooks/StrartegyReturn.hook";
import { IncentivesButton } from "../../../landing-page/tabs/ilms/table/IncentivesButton";
import { SignIndicatingElement } from "../../../../components/other/SignIndicatingElement";

export const StrategyHeading = () => {
  const { address } = useParams();
  const strategy = address as Address | undefined;

  const { data: strategyData, ...rest } = useFetchFullStrategyData(strategy);

  const { data: apy, ...apyRest } = useFetchFormattedStrategyHistoricReturn(strategy);

  return (
    <FlexCol>
      <FlexRow className="items-center gap-4">
        <DisplayText
          viewValue={strategyData?.name}
          {...rest}
          typography="bold7"
          skeletonSettings={{
            height: "40px",
            width: "600px",
          }}
        />

        <SignIndicatingElement
          dislayable={{
            ...apyRest,
            data: apy,
          }}
        >
          <DisplayNumber typography="bold3" {...apy} {...apyRest} />
        </SignIndicatingElement>

        {strategy && (
          <div className="h-auto">
            <IncentivesButton strategy={strategy} />
          </div>
        )}
      </FlexRow>
      {strategyData?.description && <Typography type="regular5">{strategyData?.description}</Typography>}
    </FlexCol>
  );
};
