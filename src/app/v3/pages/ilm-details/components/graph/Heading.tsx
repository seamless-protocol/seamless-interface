import { DisplayMoney, DisplayPercentage, FlexCol, FlexRow, Typography } from "@shared";
import { useFetchFormattedAssetPrice } from "../../../../../statev3/queries/AssetPrice.hook";
import { useParams } from "react-router-dom";
import { Address } from "viem";
import { useFetchFormattedStrategyHistoricReturn } from "../../../../../statev3/hooks/StrartegyReturn.hook";

export const Heading = () => {
  const { address } = useParams();
  const strategy = address as Address;

  const { data: price, ...otherPrice } = useFetchFormattedAssetPrice(strategy);
  const { data: apy, ...apyRest } = useFetchFormattedStrategyHistoricReturn(strategy);

  return (
    <FlexCol className="gap-2">
      <Typography type="bold4">Current LP token price</Typography>
      <DisplayMoney typography="bold7" {...otherPrice} {...price} />
      <FlexRow className="gap-1">
        <DisplayPercentage className="text-success-900" {...apyRest} {...apy} typography="bold3" />
        <Typography type="bold3">Past month</Typography>
      </FlexRow>
    </FlexCol>
  );
};
