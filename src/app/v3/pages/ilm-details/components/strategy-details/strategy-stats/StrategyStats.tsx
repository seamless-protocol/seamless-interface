import {
  DisplayMoney,
  DisplayText,
  FlexCol,
  FlexRow,
  Typography,
} from "@shared";
import border from "@assets/common/border.svg";
import { useFetchFormattedEquity } from "../../../../../../statev3/queries/Equity.hook";
import { wstETHBooster_ADDRESS } from "../../../../../../../meta";
import { useFetchFormattedStrategyCap } from "../../../../../../statev3/queries/StrategyCap.hook";
import { useFetchFormattedStrategyTargetMultiples } from "../../../../../../statev3/metadata/StrategyTargetMultiples.hook";
import { useFetchFormattedStrategyMultiple } from "../../../../../../statev3/hooks/StrategyMultiple.hook";

export const StrategyStats = () => {
  const { data: tvl, ...tvlRest } = useFetchFormattedEquity(wstETHBooster_ADDRESS);

  const { data: supplyCap, ...supplyCapRest } = useFetchFormattedStrategyCap(wstETHBooster_ADDRESS);

  const { data: targetMultiples, ...targetMultiplesRest } =
    useFetchFormattedStrategyTargetMultiples(wstETHBooster_ADDRESS);

  const { data: currentMultiple, ...currentMultipleRest } = useFetchFormattedStrategyMultiple(wstETHBooster_ADDRESS);

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
            text={`${targetMultiples.maxForRebalance?.viewValue} - ${targetMultiples.minForRebalance?.viewValue}`}
            loaderSkeleton={false}
          ></DisplayText>
        </FlexCol>
        <img src={border} alt="border" />
      </FlexRow>
      <FlexRow className="w-1/4">
        <FlexCol className="justify-between">
          <Typography type="medium3" className="text-primary-600 max-w-20">
            Current leverage
          </Typography>
          <DisplayText
            {...currentMultipleRest}
            typography="bold5"
            className="text-primary-1000"
            text={`${currentMultiple?.viewValue}`}
            loaderSkeleton={false}
          ></DisplayText>
        </FlexCol>
      </FlexRow>
    </FlexRow>
  );
};
