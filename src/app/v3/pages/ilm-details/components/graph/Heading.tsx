import { DisplayMoney, FlexCol, Typography } from "@shared";
import { useFetchFormattedAssetPrice } from "../../../../../statev3/queries/AssetPrice.hook";
import { useParams } from "react-router-dom";
import { Address } from "viem";

export const Heading = () => {
  const { address } = useParams();
  const strategy = address as Address;

  const { data: price, ...otherPrice } = useFetchFormattedAssetPrice(strategy);

  return (
    <FlexCol className="gap-2">
      <Typography type="bold4">Current LP token price</Typography>
      <DisplayMoney typography="bold7" {...otherPrice} {...price} />
      <Typography type="bold3">0.12 (17.67%) Past month</Typography>
    </FlexCol>
  );
};
