import { useAccount } from "wagmi";
import { VaultsTableContainer } from "./components/VaultsTableContainer";
import { useMorphoUserRewards } from "../../../../../statev3/morpho/user-rewards/MorphoUserRewards.hook";

export const MorphoVaultsTab = () => {
  const { address } = useAccount();
  const { data } = useMorphoUserRewards(address);
  console.log({ data });
  return (
    <div>
      <VaultsTableContainer />
    </div>
  );
};
