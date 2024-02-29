import {
  DisplayMoney,
  DisplayTokenAmount,
  Divider,
  FlexCol,
  Typography,
  VerticalDivider,
  ViewValueSymbolPair,
} from "../../../../shared";
import { useFetchViewStrategyInfo } from "../hooks/useFetchViewStrategyInfo";
import { ilmStrategies } from "../../../state/loop-strategy/config/StrategyConfig";

export const StrategyStatusAndConfiguration: React.FC<{
  id: number;
}> = ({ id }) => {
  const { data, isFetched } = useFetchViewStrategyInfo(id);

  return (
    <FlexCol className="px-6 py-4 gap-8">
      <Typography type="h3">Strategy status & configuration</Typography>
      <FlexCol className="gap-10">
        <FlexCol className="md:flex-row gap-4">
          <Typography type="subheader1" className="md:min-w-[170px]">
            Strategy info
          </Typography>
          <FlexCol className="md:flex-row gap-4 md:gap-0">
            <LocalValueComponent
              title="Total market value"
              isFetched={isFetched}
              mainValue={data.collateral.tokenAmount}
              secondaryValue={data.collateral.dollarAmount}
            />
            <VerticalDivider />
            <LocalValueComponent
              title="Total supplied"
              mainValue={data.equity.tokenAmount}
              secondaryValue={data.equity.dollarAmount}
              isFetched={isFetched}
            />
            <VerticalDivider />
            <LocalValueComponent
              title="Current multiple"
              mainValue={data.currentMultiple}
              isFetched={isFetched}
            />
            <VerticalDivider />
            <LocalValueComponent
              title="Target multiple"
              mainValue={data?.targetMultiple}
              isFetched={isFetched}
            />
          </FlexCol>
        </FlexCol>

        <Divider />

        <FlexCol className="md:flex-row gap-4">
          <Typography type="subheader1" className="md:min-w-[170px]">
            Description
          </Typography>
          <FlexCol>
            <Typography type="description">
              This integrated Liquidity Market (ILM) uses{" "}
              {ilmStrategies[id].underlyingAsset.symbol} deposits to borrow ETH,
              which is used to purchase more{" "}
              {ilmStrategies[id].underlyingAsset.symbol} to achieve the targeted
              multiple.
            </Typography>
            <br />
            <Typography type="description">
              This amplifies the participant's{" "}
              {ilmStrategies[id].underlyingAsset.symbol} and ETH staking reward
              exposure.
            </Typography>
          </FlexCol>
        </FlexCol>

        <Divider />

        <img src={ilmStrategies[id].diagram} />
      </FlexCol>
    </FlexCol>
  );
};

const LocalValueComponent: React.FC<{
  title: string;
  mainValue?: ViewValueSymbolPair;
  secondaryValue?: ViewValueSymbolPair;
  isLoading?: boolean;
  isFetched?: boolean;
}> = ({ title, mainValue, secondaryValue, isFetched }) => {
  return (
    <FlexCol>
      <Typography type="description">{title}</Typography>
      <FlexCol>
        <DisplayTokenAmount
          typography="main16"
          {...mainValue}
          isFetched={isFetched}
        />
        {secondaryValue && (
          <DisplayMoney
            typography="secondary12"
            {...secondaryValue}
            isFetched={isFetched}
          />
        )}
      </FlexCol>
    </FlexCol>
  );
};
