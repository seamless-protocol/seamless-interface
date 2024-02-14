import React from "react";
import {
  FlexCol,
  FlexRow,
  Typography,
  DisplayValue,
  DisplayPercentage,
  DisplayMoney,
  DisplayText,
  Icon,
} from "../../../../shared";
import { useFetchViewStrategyPageHeader } from "../../../state/loop-strategy/hooks/useFetchViewStrategyPageHeader";

export const Heading: React.FC<{
  id: number;
}> = ({ id }) => {
  const { isFetched, data } = useFetchViewStrategyPageHeader(id);
  console.log("data", data);

  return (
    <div className="gap-10 md:gap-48 text-text-primary flex md:flex-row flex-col">
      <FlexRow className="gap-2 text-start">
        <Icon
          src={data?.underlyingAsset?.logo}
          alt={data?.underlyingAsset?.name || "asset"}
          isFetched={isFetched}
          width={55}
          height={55}
        />
        <FlexCol>
          <DisplayText
            typography="main21"
            text={data?.underlyingAsset?.name}
            isFetched={isFetched}
          />
          <DisplayText
            typography="description"
            text={data?.underlyingAsset?.symbol}
            isFetched={isFetched}
          />
        </FlexCol>
      </FlexRow>
      <FlexRow className="gap-8">
        <FlexCol>
          <Typography type="description" color="light">
            Target multiple
          </Typography>
          <DisplayValue
            typography="main21"
            {...data?.targetMultiple}
            isFetched={isFetched}
            loaderSkeleton
          />
        </FlexCol>
        <FlexCol>
          <Typography type="description" color="light">
            APY estimate
          </Typography>
          <DisplayPercentage
            typography="main21"
            {...data?.apy}
            isFetched={isFetched}
          />
        </FlexCol>
        <FlexCol>
          <Typography type="description" color="light">
            Oracle price
          </Typography>
          <DisplayMoney
            typography="main21"
            {...data?.oraclePrice}
            isFetched={isFetched}
          />
        </FlexCol>
      </FlexRow>
    </div>
  );
};
