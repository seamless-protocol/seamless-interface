import { Displayable, DisplayMoney, DisplayText, FlexCol, FlexRow, Typography } from "@shared";
import border from "@assets/common/border.svg";
import { LeverageToken } from "@app/data/leverage-tokens/queries/all-leverage-tokens/FetchAllLeverageTokens";

const skeletonLoaderSettings = {
  width: "120px",
  height: "30px",
};

export interface LeverageTokenStatsProps {
  leverageToken: Displayable<LeverageToken | undefined>;
}

export const LeverageTokenStats: React.FC<LeverageTokenStatsProps> = ({ leverageToken }) => {
  const { data: { tvl, currentMultiple } = {}, ...rest } = leverageToken;

  return (
    <div className="flex md:flex-row flex-col w-full rounded-card bg-neutral-0 py-8 pl-6 md:min-h-36 gap-5">
      <FlexRow className="md:w-1/3 justify-between">
        <FlexCol className="max-w-max justify-between">
          <Typography type="medium3" className="text-primary-600">
            Leverage Token TVL
          </Typography>
          <FlexCol className="gap-1">
            <DisplayMoney
              {...tvl?.dollarAmount}
              {...rest}
              typography="bold5"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
            <DisplayMoney
              {...tvl?.tokenAmount}
              {...rest}
              typography="bold2"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
          </FlexCol>
        </FlexCol>
        <img src={border} alt="border" className="hidden md:block" />
      </FlexRow>
      <FlexRow className="md:w-1/3 justify-between">
        <FlexCol className="justify-between">
          <Typography type="medium3" className="text-primary-600 ">
            Total Leverage Token TVL
          </Typography>
          <FlexCol className="gap-1">
            <DisplayMoney
              {...tvl?.dollarAmount}
              {...rest}
              typography="bold5"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
            <DisplayMoney
              {...tvl?.tokenAmount}
              {...rest}
              typography="bold2"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
          </FlexCol>
        </FlexCol>
        <img src={border} alt="border" className="hidden md:block" />
      </FlexRow>
      <FlexRow className="md:w-1/3">
        <FlexCol className="justify-between">
          <Typography type="medium3" className="text-primary-600  ">
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
