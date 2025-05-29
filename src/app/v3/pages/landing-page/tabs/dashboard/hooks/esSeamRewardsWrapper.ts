import { SeamlessWriteAsyncParams } from "@shared";
import { type RewardItem } from "../contexts/RewardsProvider";

// todo vestedSeam icon? is icon correct on figma actually?
import vestedSeamIcon from "@assets/tokens/vestedSeam.svg";
import { useMutateClaimVestedEsSEAM } from "../../../../../../statev3/governance/mutations/useMutateClaimVestedEsSEAM";
import { useFetchVestedSeam } from "../../../../../../statev3/governance/queries/vested-seam/FetchVestedSeam.hook";
import { ESSEAM_ADDRESS } from "../../../../../../../meta";

const config = {
  id: "4",
  icon: vestedSeamIcon,
  name: "esSEAM rewards",
  description: "Vested esSEAM rewards",
};

export const useEsSeamRewardsWrapper = ({ settings }: { settings: SeamlessWriteAsyncParams }): RewardItem => {
  const { claimVestedAsync, isClaimVestedPending } = useMutateClaimVestedEsSEAM(settings);
  const { data: vestedSeam } = useFetchVestedSeam();

  return {
    ...config,
    claimAllAsync: claimVestedAsync,
    isClaiming: isClaimVestedPending,
    rewards: [
      {
        tokenAmount: vestedSeam,
        logo: vestedSeamIcon,
        address: ESSEAM_ADDRESS,
      },
    ],
  };
};
