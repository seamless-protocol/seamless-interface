import { Address } from "viem";
import { useFetchFullStrategyData } from "../../../../../statev3/metadata/FullStrategyData.all";
import { Image } from "../../../../../../shared";

export const HowStrategyWorks: React.FC<{
  strategy?: Address;
}> = ({ strategy }) => {
  const { data: { diagram } = {} } = useFetchFullStrategyData(strategy);

  if (!strategy) {
    return <div>No strategy selected</div>;
  }

  return (
    <div>
      <Image src={diagram} alt="Strategy diagram" />
    </div>
  );
};
