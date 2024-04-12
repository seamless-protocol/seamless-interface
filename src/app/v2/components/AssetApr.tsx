import { Address } from "viem";
import { useFetchViewSupplyIncentives } from "../../state/lending-borrowing/hooks/useFetchViewSupplyIncentives";
import { DisplayPercentage, DisplayPercentageProps } from "../../../shared";

interface AssetAprProps extends DisplayPercentageProps {
  asset: Address;
}

export const AssetApr: React.FC<AssetAprProps> = ({ asset, ...rest }) => {
  const {
    isLoading,
    isFetched,
    data: { totalApr },
  } = useFetchViewSupplyIncentives(asset);

  return <DisplayPercentage isLoading={isLoading} isFetched={isFetched} {...rest} {...totalApr} />;
};
