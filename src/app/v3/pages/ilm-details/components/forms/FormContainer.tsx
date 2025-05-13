import { FlexCol, FlexRow, Typography } from "@shared";
import { WithdrawLeverageTokenForm } from "../../../../components/forms/withdraw-form/WithdrawForm";
import { DepositLeverageTokenForm } from "../../../../components/forms/deposit-form/DepositForm";
import { useLeverageTokenFormContext } from "../../../../components/forms/contexts/leverage-token-form-provider/LeverageTokenFormProvider";

export const FormContainer = () => {
  const { mode, setMode } = useLeverageTokenFormContext();

  return (
    <FlexCol className="bg-neutral-0 shadow-card p-6 gap-6 rounded-2xl w-full">
      <FlexRow className="items-center gap-1">
        <div className="cursor-not-allowed">
          <LocalButtonSwitcher onClick={() => setMode("deposit")} data-cy="deposit-button" disabled>
            Deposit
          </LocalButtonSwitcher>
        </div>

        <LocalButtonSwitcher onClick={() => setMode("withdraw")} data-cy="withdraw-button" isActive>
          Withdraw
        </LocalButtonSwitcher>
      </FlexRow>
      <div>
        {mode === "deposit" && <DepositLeverageTokenForm />}
        {mode === "withdraw" && <WithdrawLeverageTokenForm />}
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
      {...props}
      className={`py-4 px-8 rounded-[100px] ${isActive ? "bg-neutral-100" : "bg-white"} ${props.className || ""}`}
    >
      <Typography type="bold3" className={`${isActive ? "text-primary-1000" : "text-neutral-400"}`}>
        {children}
      </Typography>
    </button>
  );
};
