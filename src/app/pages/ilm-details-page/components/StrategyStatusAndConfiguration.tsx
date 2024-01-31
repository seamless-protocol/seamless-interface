import {
  DisplayMoney,
  DisplayTokenAmount,
  Divider,
  FlexCol,
  Typography,
  ValueSymbolPair,
  VerticalDivider,
} from "../../../../shared";
import { useFetchViewStrategyInfo } from "../../../state/loop-strategy/hooks/useFetchViewStrategyInfo";

import ilmDiagram from "/public/ilm-diagram.png";

export const StrategyStatusAndConfiguration: React.FC<{
  id: number;
}> = ({ id }) => {
  const { data, isLoading } = useFetchViewStrategyInfo(id);

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
              mainValue={{
                ...data?.collateral.tokenAmount,
              }}
              secondaryValue={{
                ...data?.collateral.dollarAmount,
              }}
              isLoading={isLoading}
            />
            <VerticalDivider />
            <LocalValueComponent
              title="Total supplied"
              mainValue={{
                ...data?.equity.tokenAmount,
              }}
              secondaryValue={{
                ...data?.equity.dollarAmount,
              }}
              isLoading={isLoading}
            />
            <VerticalDivider />
            <LocalValueComponent
              title="Current multiple"
              mainValue={{
                value: data?.currentMultiple,
              }}
              isLoading={isLoading}
            />
            <VerticalDivider />
            <LocalValueComponent
              title="Target multiple"
              mainValue={{
                value: data?.targetMultiple,
              }}
              isLoading={isLoading}
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
              This integrated Liquidity Market (ILM) uses cbETH deposits to
              borrow ETH, which is used to purchase more cbETH to achieve the
              targeted multiple.
            </Typography>
            <br />
            <Typography type="description">
              This amplifies the participant's cbETH and ETH staking reward
              exposure.
            </Typography>
          </FlexCol>
        </FlexCol>

        <Divider />

        <img src={ilmDiagram} />
      </FlexCol>
    </FlexCol>
  );
};

const LocalValueComponent: React.FC<{
  title: string;
  mainValue?: ValueSymbolPair;
  secondaryValue?: ValueSymbolPair;
  isLoading?: boolean;
}> = ({ title, mainValue, secondaryValue, isLoading }) => {
  return (
    <FlexCol>
      <Typography type="description">{title}</Typography>
      <FlexCol>
        <DisplayTokenAmount
          typography="main16"
          {...mainValue}
          isLoading={isLoading}
        />
        {secondaryValue && (
          <DisplayMoney
            typography="secondary12"
            {...secondaryValue}
            isLoading={isLoading}
          />
        )}
      </FlexCol>
    </FlexCol>
  );
};
