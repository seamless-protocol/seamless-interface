import { StandardTooltip } from "@shared";

export const StakeInfoTooltip = () => {
  return (
    <StandardTooltip openOnClick={false}>
      After unstake cooldown ends - your unstaking period begins, <br /> and you will have 24 hours to unstake, before
      it locks again.
    </StandardTooltip>
  );
};
