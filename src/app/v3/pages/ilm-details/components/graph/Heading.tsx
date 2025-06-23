import { DisplayMoney, DisplayPercentage, FlexCol, FlexRow, Typography } from "@shared";
import { useFetchFormattedAssetPrice } from "../../../../../data/common/queries/AssetPrice.hook";
import { useParams } from "react-router-dom";
import { Address } from "viem";
import { useFetchFormattedStrategyHistoricReturn } from "../../../../../data/ilmv1-deprecated/hooks/StrartegyReturn.hook";
import { SignIndicatingElement } from "../../../../components/other/SignIndicatingElement";

export const Heading = () => {
  const { address } = useParams();
  const strategy = address as Address;

  const { data: price, ...otherPrice } = useFetchFormattedAssetPrice(strategy, undefined, {
    disableCompact: true,
  });
  const { data: apy, ...apyRest } = useFetchFormattedStrategyHistoricReturn(strategy);

  return (
    <FlexCol className="gap-2">
      <Typography type="bold4">Current LP token price</Typography>
      <DisplayMoney typography="bold7" {...otherPrice} {...price} />
      <FlexRow className="gap-1 items-center">
        <SignIndicatingElement noBackground dislayable={{ ...apyRest, data: apy }}>
          <DisplayPercentage {...apyRest} {...apy} typography="bold3" />
        </SignIndicatingElement>
        <Typography type="bold3">Past month</Typography>
      </FlexRow>
    </FlexCol>
  );
};
