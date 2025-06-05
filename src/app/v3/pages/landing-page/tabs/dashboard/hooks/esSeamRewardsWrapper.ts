import { FetchData, SeamlessWriteAsyncParams } from "@shared";
import { type RewardItem } from "../contexts/RewardsProvider";

// todo vestedSeam icon? is icon correct on figma actually?
import vestedSeamIcon from "@assets/tokens/vestedSeam.svg";
import { useMutateClaimVestedEsSEAM } from "../../../../../../statev3/governance/mutations/useMutateClaimVestedEsSEAM";
import { useFetchVestedSeamWithDollarAmount } from "../../../../../../statev3/governance/queries/vested-seam/FetchVestedSeam.hook";
import { ESSEAM_ADDRESS } from "../../../../../../../meta";

const config = {
  id: "4",
  icon: vestedSeamIcon,
  name: "esSEAM rewards",
  description: "Vested esSEAM rewards",
};

export const useEsSeamRewardsWrapper = ({
  settings,
}: {
  settings: SeamlessWriteAsyncParams;
}): FetchData<RewardItem> => {
  const { claimVestedAsync, isClaimVestedPending } = useMutateClaimVestedEsSEAM(settings);
  const { data: vestedSeam, ...rest } = useFetchVestedSeamWithDollarAmount();

  return {
    ...rest,
    data: {
      ...config,
      claimAllAsync: claimVestedAsync,
      isClaiming: isClaimVestedPending,
      rewards:
        (vestedSeam?.tokenAmount?.bigIntValue || 0n) > 0n
          ? [
              {
                dollarAmount: vestedSeam?.dollarAmount,
                tokenAmount: vestedSeam?.tokenAmount,
                logo: vestedSeamIcon,
                address: ESSEAM_ADDRESS,
              },
            ]
          : [],
    },
  };
};
