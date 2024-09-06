import { Address } from "viem";
import { strategyDetails } from "../../../../../statev3/settings/config";

export const MainRisks: React.FC<{
  strategy?: Address;
}> = ({ strategy }) => {
  if (!strategy) {
    return <div>No strategy selected</div>;
  }
  const jsx = strategyDetails[strategy]?.MainRisks;

  return <div>{jsx}</div>;
};
