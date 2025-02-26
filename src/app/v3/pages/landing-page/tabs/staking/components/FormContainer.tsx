import { useState } from "react";
import { FlexCol, FlexRow, Typography } from "@shared";
import { useParams } from "react-router-dom";
import { Address } from "viem";
import { FormSettingsProvider } from "../../../../../components/forms/contexts/FormSettingsContext";
import { StakingDepositForm } from "../../../../../components/forms/safety-module-form/deposit-form/StakingDepositForm";
import { MorphoWithdrawForm } from "../../../../../components/forms/morpho-vault/withdraw-form/MorphoWithdrawForm";

export const FormContainer: React.FC = () => {
  // const { address } = useParams();
  const address = "0x0fb8b28d18889b121cdd1ef82a88e1ac1540f284"; // TODO: put this somewhere better
  const vault = address as Address | undefined;
  const [isDepositing, setIsDepositing] = useState(true);

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
            <MorphoWithdrawForm />
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
