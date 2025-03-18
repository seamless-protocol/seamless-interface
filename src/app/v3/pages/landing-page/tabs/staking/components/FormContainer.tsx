import { useState, useEffect } from "react";
import { FlexCol, FlexRow, Typography } from "@shared";
import { Address } from "viem";
import { FormSettingsProvider } from "../../../../../components/forms/contexts/FormSettingsContext";
import { StakingDepositForm } from "../../../../../components/forms/safety-module-form/deposit-form/StakingDepositForm";
import { UnstakeForm } from "../../../../../components/forms/safety-module-form/withdraw-form/UnstakeForm";
import { InitiateCooldownForm } from "../../../../../components/forms/safety-module-form/withdraw-form/InitiateCooldownForm";
import { useFetchStakerCooldown } from "../../../../../../statev3/safetyModule/hooks/useFetchStakerCooldown";
import { useFetchCooldown } from "../../../../../../statev3/safetyModule/hooks/useFetchCooldown";
import { useFetchUnstakeWindow } from "../../../../../../statev3/safetyModule/hooks/useFetchUnstakeWindow";
import { STAKED_SEAM_ADDRESS } from "@meta";

const getDeadlines = (startTime: bigint, cooldown: bigint, unstakeWindow: bigint) => {
  const canUnstakeAt = startTime + cooldown;
  const unstakeEndsAt = canUnstakeAt + unstakeWindow;
  return { canUnstakeAt, unstakeEndsAt };
};

export const FormContainer: React.FC = () => {
  const vault = STAKED_SEAM_ADDRESS as Address | undefined;
  const [isDepositing, setIsDepositing] = useState(true);
  const [hasCooldown, setHasCooldown] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [isUnstakeWindow, setIsUnstakeWindow] = useState(false);
  const { data: userCooldown } = useFetchStakerCooldown(STAKED_SEAM_ADDRESS);
  const { data: cooldown } = useFetchCooldown(STAKED_SEAM_ADDRESS);
  const { data: unstakeWindow } = useFetchUnstakeWindow(STAKED_SEAM_ADDRESS);

  const userCooldownValue = userCooldown?.bigIntValue ?? 0n;
  const cooldownValue = cooldown?.bigIntValue ?? 0n;
  const unstakeWindowValue = unstakeWindow?.bigIntValue ?? 0n;

  useEffect(() => {
    const interval = setInterval(() => {
      const now: number = Math.floor(Date.now() / 1000);
      const { canUnstakeAt, unstakeEndsAt } = getDeadlines(userCooldownValue, cooldownValue, unstakeWindowValue);
      const canUnstakeAtNum = Number(canUnstakeAt);
      const unstakeEndsAtNum = Number(unstakeEndsAt);

      if (now > unstakeEndsAtNum || userCooldownValue === 0n) {
        setHasCooldown(false);
        setRemaining(0);
        clearInterval(interval);
      } else {
        if (now < canUnstakeAtNum) {
          const timeLeft = canUnstakeAtNum - now;
          setRemaining(timeLeft);
          setIsUnstakeWindow(false);
        } else {
          const timeLeft = unstakeEndsAtNum - now;
          setRemaining(timeLeft);
          setIsUnstakeWindow(true);
        }
        setHasCooldown(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [userCooldownValue]);

  return (
    <FlexCol className="bg-neutral-0 shadow-card p-6 gap-6 rounded-2xl w-full">
      <FlexRow className="items-center gap-1">
        <LocalButtonSwitcher
          data-cy="deposit-button"
          onClick={() => {
            setIsDepositing(true);
          }}
          isActive={isDepositing}
        >
          Stake
        </LocalButtonSwitcher>

        <LocalButtonSwitcher
          data-cy="withdraw-button"
          onClick={() => {
            setIsDepositing(false);
          }}
          isActive={!isDepositing}
        >
          Unstake
        </LocalButtonSwitcher>
      </FlexRow>
      <div>
        {isDepositing ? (
          <FormSettingsProvider defaultStrategy={vault}>
            <StakingDepositForm />
          </FormSettingsProvider>
        ) : (
          <FormSettingsProvider defaultStrategy={vault}>
            {!hasCooldown ? (
              <InitiateCooldownForm />
            ) : (
              <UnstakeForm remaining={remaining} isUnstakeWindow={isUnstakeWindow} />
            )}
          </FormSettingsProvider>
        )}
      </div>
    </FlexCol>
  );
};

interface LocalButtonSwitcherProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const LocalButtonSwitcher: React.FC<LocalButtonSwitcherProps> = ({ children, onClick, isActive, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-8 rounded-[100px] ${isActive ? "bg-neutral-100" : "bg-white"}`}
      {...props}
    >
      <Typography type="bold3" className={`${isActive ? "text-primary-1000" : "text-neutral-400"}`}>
        {children}
      </Typography>
    </button>
  );
};
