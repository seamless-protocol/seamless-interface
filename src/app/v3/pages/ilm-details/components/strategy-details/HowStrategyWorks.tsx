import { useParams } from "react-router-dom";
import { Address } from "viem";
import { useFetchFullStrategyData } from "../../../../../statev3/metadata/FullStrategyData.all";
import { Image } from "../../../../../../shared";

export const HowStrategyWorks = () => {
  const { address } = useParams();
  const strategy = address as Address | undefined;

  const { data: { diagram } = {} } = useFetchFullStrategyData(strategy);

  return (
    <div>
      <Image src={diagram} alt="Strategy diagram" />
    </div>
  );
};
