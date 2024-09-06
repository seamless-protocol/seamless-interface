import { Address } from "viem";
import { strategyDetails } from "../../../../../statev3/settings/config";

export const FeesInformation: React.FC<{
  strategy?: Address;
}> = ({ strategy }) => {
  if (!strategy) {
    return <div>No strategy selected</div>;
  }
  const jsx = strategyDetails[strategy]?.StrategyFees;

  return <div>{jsx}</div>;
};
