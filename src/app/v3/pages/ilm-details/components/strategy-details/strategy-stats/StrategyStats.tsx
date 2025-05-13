import { Displayable, DisplayMoney, DisplayText, FlexCol, FlexRow, Typography, ViewBigInt } from "@shared";
import border from "@assets/common/border.svg";
import { LeverageToken } from "../../../../../../data/leverage-tokens/queries/all-leverage-tokens/FetchAllLeverageTokens";

function getMinMaxLeverageText(min: ViewBigInt | undefined, max: ViewBigInt | undefined): string | undefined {
  return `${min?.viewValue}${min?.symbol} - ${max?.viewValue}${max?.symbol}`;
}

const skeletonLoaderSettings = {
  width: "120px",
  height: "30px",
};

export interface LeverageTokenStatsProps {
  leverageToken: Displayable<LeverageToken | undefined>;
}

export const LeverageTokenStats: React.FC<LeverageTokenStatsProps> = ({ leverageToken }) => {
  const {
    data: {
      tvl: { dollarAmount = {} } = {},
      availableSupplyCap: { dollarAmount: capDollarAmount = undefined } = {},
      targetMultiples: { minForRebalance = undefined, maxForRebalance = undefined } = {},
      currentMultiple,
    } = {},
    ...rest
  } = leverageToken;

  return (
    <div className="flex md:flex-row flex-col w-full rounded-card bg-neutral-0 py-8 pl-6 md:min-h-36 gap-5">
      <FlexRow className="md:w-1/4 justify-between">
        <FlexCol className="justify-between ">
          <Typography type="medium3" className="text-primary-600">
            TVL
          </Typography>
          <DisplayMoney
            {...dollarAmount}
            {...rest}
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
            {...capDollarAmount}
            {...rest}
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
            {...rest}
            typography="bold5"
            className="text-primary-1000"
            text={getMinMaxLeverageText(maxForRebalance, minForRebalance)}
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
            {...rest}
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
