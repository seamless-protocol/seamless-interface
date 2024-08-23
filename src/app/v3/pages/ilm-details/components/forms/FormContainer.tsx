import { useState } from "react";
import { FlexCol, FlexRow, Typography } from "@shared";
import { FormSettingsProvider } from "../../../../components/forms/contexts/FormSettingsContext";
import { useParams } from "react-router-dom";
import { Address } from "viem";
import { StrategyForm } from "../../../../components/forms/earn-forms/deposit-strategy-form/StrategyForm";
import { WithdrawStrategyForm } from "../../../../components/forms/withdraw-forms/withdraw-strategy-form/WithdrawStrategyForm";

export const FormContainer: React.FC = () => {
  const { address } = useParams();
  console.log({ address });
  const strategy = address as Address;
  const [isDepositing, setIsDepositing] = useState(true);

  return (
    <FlexCol className="bg-neutral-0 shadow-card p-6 rounded-2xl">
      <FlexRow className="items-center gap-1">
        <LocalButtonSwitcher
          onClick={() => {
            setIsDepositing(true);
          }}
          isActive={isDepositing}
        >
          Deposit
        </LocalButtonSwitcher>

        <LocalButtonSwitcher
          onClick={() => {
            setIsDepositing(false);
          }}
          isActive={!isDepositing}
        >
          Withdraw
        </LocalButtonSwitcher>
      </FlexRow>
      <FlexRow className="gap-2">
        {isDepositing ? (
          <FormSettingsProvider defaultStrategy={strategy}>
            <StrategyForm />
          </FormSettingsProvider>
        ) : (
          <FormSettingsProvider defaultStrategy={strategy}>
            <WithdrawStrategyForm />
          </FormSettingsProvider>
        )}
      </FlexRow>
    </FlexCol>
  );
};

const LocalButtonSwitcher: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  isActive?: boolean;
}> = ({ children, onClick, isActive }) => {
  return (
    <button onClick={onClick} className={`py-4 px-8 rounded-[100px] ${isActive ? "bg-neutral-100" : "bg-white"}`}>
      <Typography type="bold3" className={`${isActive ? "text-primary-1000" : "text-neutral-400"}`}>
        {children}
      </Typography>
    </button>
  );
};
