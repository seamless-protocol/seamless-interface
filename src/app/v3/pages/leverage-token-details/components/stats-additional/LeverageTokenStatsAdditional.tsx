import { Displayable, DisplayMoney, FlexCol, FlexRow, Typography } from "@shared";
import border from "@assets/common/border.svg";
import { LeverageToken } from "@app/data/leverage-tokens/queries/all-leverage-tokens/FetchAllLeverageTokens";

const skeletonLoaderSettings = {
  width: "120px",
  height: "30px",
};

export interface LeverageTokenStatsProps {
  leverageToken: Displayable<LeverageToken | undefined>;
}

export const LeverageTokenStatsAdditional: React.FC<LeverageTokenStatsProps> = ({ leverageToken }) => {
  const { data: { tvl, equity, debt } = {}, ...rest } = leverageToken;

  return (
    <div className="flex md:flex-row flex-col w-full rounded-card bg-neutral-0 py-8 pl-6 md:min-h-36 gap-5">
      <FlexRow className="md:w-1/3 justify-between">
        <FlexCol className="justify-between ">
          <Typography type="medium3" className="text-primary-600">
            TVL
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
        <FlexCol className="max-w-max justify-between">
          <Typography type="medium3" className="text-primary-600">
            Total Assets
          </Typography>
          <FlexCol className="gap-1">
            <DisplayMoney
              {...equity?.dollarAmount}
              {...rest}
              typography="bold5"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
            <DisplayMoney
              {...equity?.tokenAmount}
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
          <Typography type="medium3" className="text-primary-600 md:max-w-30">
            Leverage Token Debt
          </Typography>
          <FlexCol className="gap-1">
            <DisplayMoney
              {...debt?.dollarAmount}
              {...rest}
              typography="bold5"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
            <DisplayMoney
              {...debt?.tokenAmount}
              {...rest}
              typography="bold2"
              className="text-primary-1000"
              loaderSkeletonSettings={skeletonLoaderSettings}
            />
          </FlexCol>
        </FlexCol>
        <img src={border} alt="border" className="hidden md:block" />
      </FlexRow>
    </div>
  );
};
