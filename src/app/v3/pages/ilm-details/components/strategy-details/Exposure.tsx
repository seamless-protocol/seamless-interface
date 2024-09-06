import { Address } from "viem";
import { strategyDetails } from "../../../../../statev3/settings/config";
import { Typography } from "../../../../../../shared";

export const Exposure: React.FC<{
  strategy?: Address;
}> = ({ strategy }) => {
  if (!strategy) {
    return <div>No strategy selected</div>;
  }
  const jsx = strategyDetails[strategy]?.Lavarage_Exposure;

  return (
    <div>
      <Typography type="regular3">{jsx}</Typography>
    </div>
  );
};
