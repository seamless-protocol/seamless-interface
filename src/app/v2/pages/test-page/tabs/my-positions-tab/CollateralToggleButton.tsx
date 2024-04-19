import { Address } from "viem";
import { useFetchViewUserReserveData } from "../../../../../state/lending-borrowing/queries/useFetchViewUserReserveData";

const CollateralToggleButtonStrategy = () => {
  return <input type="checkbox" checked={false} className="toggle" onChange={() => {}} />;
};

const CollateralToggleButtonReserve: React.FC<{ reserve: Address }> = ({ reserve }) => {
  const { data } = useFetchViewUserReserveData(reserve);

  return <input type="checkbox" checked={data?.usageAsCollateralEnabled} className="toggle" onChange={() => {}} />;
};

export const CollateralToggleButton: React.FC<{ reserve: Address; isStrategy: boolean }> = ({
  reserve,
  isStrategy,
}) => {
  return isStrategy ? <CollateralToggleButtonStrategy /> : <CollateralToggleButtonReserve reserve={reserve} />;
};
