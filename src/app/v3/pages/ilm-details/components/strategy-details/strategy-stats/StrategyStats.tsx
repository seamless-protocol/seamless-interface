import { DisplayMoney, DisplayText, FlexCol, FlexRow, Typography, ViewBigInt } from "@shared";
import border from "@assets/common/border.svg";
import { useFetchFormattedEquity } from "../../../../../../data/ilmv1-deprecated/queries/Equity.hook";
import { useFetchFormattedStrategyCap } from "../../../../../../data/ilmv1-deprecated/queries/StrategyCap.hook";
import { useFetchFormattedStrategyTargetMultiples } from "../../../../../../data/ilmv1-deprecated/metadata/StrategyTargetMultiples.hook";
import { useParams } from "react-router-dom";
import { Address } from "viem";
import { useFetchFormattedStrategyMultiple } from "../../../../../../data/ilmv1-deprecated/hooks/StrategyMultiple.all";

function getMinMaxLeverageText(min: ViewBigInt | undefined, max: ViewBigInt | undefined): string | undefined {
  return `${min?.viewValue}${min?.symbol} - ${max?.viewValue}${max?.symbol}`;
}

const skeletonLoaderSettings = {
  width: "120px",
  height: "30px",
};

export const StrategyStats = () => {
  const { address } = useParams();
  const strategy = address as Address | undefined;

  const { data: tvl, ...tvlRest } = useFetchFormattedEquity(strategy);

  const { data: supplyCap, ...supplyCapRest } = useFetchFormattedStrategyCap(strategy);

  const { data: targetMultiples, ...targetMultiplesRest } = useFetchFormattedStrategyTargetMultiples(strategy);

  const { data: currentMultiple, ...currentMultipleRest } = useFetchFormattedStrategyMultiple(strategy);

  return (
    <div className="flex md:flex-row flex-col w-full rounded-card bg-neutral-0 py-8 pl-6 md:min-h-36 gap-5">
      <FlexRow className="md:w-1/4 justify-between">
        <FlexCol className="justify-between ">
          <Typography type="medium3" className="text-primary-600">
            TVL
          </Typography>
          <DisplayMoney
            {...tvl.dollarAmount}
            {...tvlRest}
            typography="bold5"
            className="text-primary-1000"
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </FlexCol>
        <img src={border} alt="border" className="hidden md:block" />
      </FlexRow>
      <FlexRow className="md:w-1/4 justify-between">
        <FlexCol className="max-w-max justify-between">
          <Typography type="medium3" className="text-primary-600">
            Supply cap
          </Typography>
          <DisplayMoney
            {...supplyCap.dollarAmount}
            {...supplyCapRest}
            typography="bold5"
            className="text-primary-1000"
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </FlexCol>
        <img src={border} alt="border" className="hidden md:block" />
      </FlexRow>
      <FlexRow className="md:w-1/4 justify-between">
        <FlexCol className="justify-between">
          <Typography type="medium3" className="text-primary-600 md:max-w-20">
            Min - Max Leverage
          </Typography>
          <DisplayText
            {...targetMultiplesRest}
            typography="bold5"
            className="text-primary-1000"
            text={getMinMaxLeverageText(targetMultiples?.maxForRebalance, targetMultiples?.minForRebalance)}
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </FlexCol>
        <img src={border} alt="border" className="hidden md:block" />
      </FlexRow>
      <FlexRow className="md:w-1/4">
        <FlexCol className="justify-between">
          <Typography type="medium3" className="text-primary-600  md:max-w-20">
            Current leverage
          </Typography>
          <DisplayText
            {...currentMultipleRest}
            {...currentMultiple}
            typography="bold5"
            className="text-primary-1000"
            symbolPosition="after"
            loaderSkeletonSettings={skeletonLoaderSettings}
          />
        </FlexCol>
      </FlexRow>
    </div>
  );
};
