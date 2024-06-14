import { Address } from "viem";
import { useFetchViewSupplyIncentives } from "../../../state/lending-borrowing/hooks/useFetchViewSupplyIncentives";
import { DisplayPercentage, DisplayPercentageProps, Tooltip, useToken } from "@shared";
import { IncentivesDetailCard } from "../incentives/IncentivesDetailCard";

interface AssetAprProps extends DisplayPercentageProps {
  asset: Address;
}

export const AssetApr: React.FC<AssetAprProps> = ({ asset, ...rest }) => {
  const { data: tokenData } = useToken(asset);

  const { isLoading, isFetched, data: supplyIncentives } = useFetchViewSupplyIncentives(asset);

  return (
    <Tooltip tooltip={<IncentivesDetailCard {...supplyIncentives} assetSymbol={tokenData?.symbol} />}>
      <DisplayPercentage isLoading={isLoading} isFetched={isFetched} {...rest} {...supplyIncentives.totalApr} />
    </Tooltip>
  );
};
