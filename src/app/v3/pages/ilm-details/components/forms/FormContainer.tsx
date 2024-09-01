import { useState } from "react";
import { FlexCol, FlexRow, Typography } from "@shared";
import { FormSettingsProvider } from "../../../../components/forms/contexts/FormSettingsContext";
import { DepositForm } from "../../../../components/forms/deposit-form/DepositForm";
import { WithdrawForm } from "../../../../components/forms/withdraw-form/WithdrawForm";

export const FormContainer: React.FC = () => {
  const [isDepositing, setIsDepositing] = useState(true);

  return (
    <FlexCol className="bg-neutral-0 shadow-card p-6 gap-6 rounded-2xl w-full">
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
      <div>
        {isDepositing ? (
          <FormSettingsProvider>
            <DepositForm />
          </FormSettingsProvider>
        ) : (
          <FormSettingsProvider>
            <WithdrawForm />
          </FormSettingsProvider>
        )}
      </div>
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
