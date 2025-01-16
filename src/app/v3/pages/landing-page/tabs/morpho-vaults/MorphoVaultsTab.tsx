import { useAccount } from "wagmi";
import { VaultsTableContainer } from "./components/VaultsTableContainer";
import { useMorphoExtendedUserRewards } from "../../../../../statev3/morpho/user-rewards/MorphoUserRewards.hook";

export const MorphoVaultsTab = () => {
  const { address } = useAccount();
  const { data } = useMorphoExtendedUserRewards(address);
  console.log({ data });
  return (
    <div>
      <VaultsTableContainer />
    </div>
  );
};
