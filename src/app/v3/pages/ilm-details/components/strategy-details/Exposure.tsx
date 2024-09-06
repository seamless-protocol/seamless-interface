import { Address } from "viem";
import { strategyDetails } from "../../../../../statev3/settings/config";

export const Exposure: React.FC<{
  strategy?: Address;
}> = ({ strategy }) => {
  if (!strategy) {
    return <div>No strategy selected</div>;
  }
  const jsx = strategyDetails[strategy]?.Lavarage_Exposure;

  return <div>{jsx}</div>;
};
