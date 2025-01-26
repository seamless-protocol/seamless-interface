import { Address } from "viem";
import { strategyDetails } from "../../../../../statev3/settings/config";
import { Typography } from "../../../../../../shared";

export const MainRisks: React.FC<{
  strategy?: Address;
}> = ({ strategy }) => {
  if (!strategy) {
    return <div>No strategy selected</div>;
  }
  const jsx = strategyDetails[strategy]?.MainRisks;

  return (
    <div>
      <Typography type="regular3">{jsx}</Typography>
    </div>
  );
};
