import { DisplayMoney, DisplayText, DisplayValue, FlexCol, FlexRow, Typography, ViewBigInt } from "@shared";
import border from "@assets/common/border.svg";
import { useFetchFormattedEquity } from "../../../../../../statev3/queries/Equity.hook";
import { useFetchFormattedStrategyCap } from "../../../../../../statev3/queries/StrategyCap.hook";
import { useFetchFormattedStrategyTargetMultiples } from "../../../../../../statev3/metadata/StrategyTargetMultiples.hook";
import { useFetchFormattedStrategyMultiple } from "../../../../../../statev3/hooks/StrategyMultiple.hook";
import { useParams } from "react-router-dom";
import { Address } from "viem";

function getMinMaxLeverageText(min: ViewBigInt | undefined, max: ViewBigInt | undefined): string | undefined {
  return `${min?.viewValue}${min?.symbol} - ${max?.viewValue}${max?.symbol}`;
}

export const StrategyStats = () => {
  const { address } = useParams();
  const strategy = address as Address | undefined;

  const { data: tvl, ...tvlRest } = useFetchFormattedEquity(strategy);

  const { data: supplyCap, ...supplyCapRest } = useFetchFormattedStrategyCap(strategy);

  const { data: targetMultiples, ...targetMultiplesRest } = useFetchFormattedStrategyTargetMultiples(
    strategy as Address
  );

  const { data: currentMultiple, ...currentMultipleRest } = useFetchFormattedStrategyMultiple(strategy);

  return (
    <FlexRow className="w-full rounded-card bg-neutral-0 py-8 pl-6 h-36 gap-5">
      <FlexRow className="w-1/4 justify-between">
        <FlexCol className="justify-between ">
          <Typography type="medium3" className="text-primary-600">
            TVL
          </Typography>
          <DisplayMoney
            {...tvl.dollarAmount}
            {...tvlRest}
            typography="bold5"
            className="text-primary-1000"
            loaderSkeleton={false}
          />
        </FlexCol>
        <img src={border} alt="border" />
      </FlexRow>
      <FlexRow className="w-1/4 justify-between">
        <FlexCol className="max-w-max justify-between">
          <Typography type="medium3" className="text-primary-600">
            Supply cap
          </Typography>
          <DisplayMoney
            {...supplyCap.dollarAmount}
            {...supplyCapRest}
            typography="bold5"
            className="text-primary-1000"
            loaderSkeleton={false}
          />
        </FlexCol>
        <img src={border} alt="border" />
      </FlexRow>
      <FlexRow className="w-1/4 justify-between">
        <FlexCol className="justify-between">
          <Typography type="medium3" className="text-primary-600 max-w-20">
            Min - Max Leverage
          </Typography>
          <DisplayText
            {...targetMultiplesRest}
            typography="bold5"
            className="text-primary-1000"
            text={getMinMaxLeverageText(targetMultiples?.maxForRebalance, targetMultiples?.minForRebalance)}
            loaderSkeleton={false}
          />
        </FlexCol>
        <img src={border} alt="border" />
      </FlexRow>
      <FlexRow className="w-1/4">
        <FlexCol className="justify-between">
          <Typography type="medium3" className="text-primary-600 max-w-20">
            Current leverage
          </Typography>
          <DisplayValue
            {...currentMultipleRest}
            {...currentMultiple}
            typography="bold5"
            className="text-primary-1000"
            symbolPosition="after"
            loaderSkeleton={false}
          />
        </FlexCol>
      </FlexRow>
    </FlexRow>
  );
};
