import {
  DisplayMoney,
  DisplayTokenAmount,
  Divider,
  FlexCol,
  Typography,
  ValueSymbolPair,
  VerticalDivider,
} from "../../../../shared";

import ilmDiagram from "/public/ilm-diagram.png";

export const StrategyStatusAndConfiguration = () => {
  const isLoading = true;
  return (
    <FlexCol className="px-6 py-4 gap-8 max-w-screen-xxsm md:max-w-screen-md">
      <Typography type="h3">Strategy status & configuration</Typography>
      <FlexCol className="gap-10">
        <FlexCol className="md:flex-row gap-4">
          <Typography type="subheader1" className="md:min-w-[170px]">
            Strategy info
          </Typography>
          <FlexCol className="md:flex-row gap-4 md:gap-0">
            <LocalValue
              title="Total market value"
              firstValue={{
                value: "81.28",
              }}
              secondValue={{
                value: "222.55K",
              }}
              isLoading={isLoading}
            />
            <VerticalDivider />
            <LocalValue
              title="Total supplied"
              firstValue={{
                value: "81.28",
              }}
              secondValue={{
                value: "222.55K",
              }}
            />
            <VerticalDivider />
            <LocalValue
              title="Current multiple"
              firstValue={{
                value: "81.28",
              }}
            />
            <VerticalDivider />
            <LocalValue
              title="Target multiple"
              firstValue={{
                value: "81.28",
              }}
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

const LocalValue: React.FC<{
  title: string;
  firstValue?: ValueSymbolPair;
  secondValue?: ValueSymbolPair;
  isLoading?: boolean;
}> = ({ title, firstValue, secondValue, isLoading }) => {
  return (
    <FlexCol>
      <Typography type="description">{title}</Typography>
      <FlexCol>
        <DisplayTokenAmount
          typography="main16"
          {...firstValue}
          isLoading={isLoading}
        />
        {secondValue && (
          <DisplayMoney
            typography="secondary12"
            {...secondValue}
            isLoading={isLoading}
          />
        )}
      </FlexCol>
    </FlexCol>
  );
};
