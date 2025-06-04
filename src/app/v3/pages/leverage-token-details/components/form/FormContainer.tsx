import { useEffect } from "react";
import { FlexCol, FlexRow, Typography } from "@shared";
import { DepositLeverageTokenForm } from "../../../../components/forms/leverage-token-form/deposit-form/DepositLeverageTokenForm";
import { WithdrawLeverageTokenForm } from "../../../../components/forms/leverage-token-form/withdraw-form/WithdrawLeverageTokenForm";
import { useParams } from "react-router-dom";
import { useLeverageTokenFormContext } from "../../../../components/forms/leverage-token-form/leverage-token-form-provider/LeverageTokenFormProvider";
import { Address } from "viem";

export const FormContainer = () => {
  const { address } = useParams();

  const { setSelectedLeverageTokenAddress, mode, setMode } = useLeverageTokenFormContext();

  useEffect(() => {
    setSelectedLeverageTokenAddress(address as Address);
  }, [address]);

  return (
    <FlexCol className="bg-neutral-0 shadow-card p-6 gap-6 rounded-2xl w-full">
      <FlexRow className="items-center gap-1">
        <LocalButtonSwitcher
          data-cy="deposit-button"
          onClick={() => {
            setMode("deposit");
          }}
          isActive={mode === "deposit"}
        >
          Mint
        </LocalButtonSwitcher>

        <LocalButtonSwitcher
          data-cy="withdraw-button"
          onClick={() => {
            setMode("withdraw");
          }}
          isActive={mode === "withdraw"}
        >
          Redeem
        </LocalButtonSwitcher>
      </FlexRow>
      <div>{mode === "deposit" ? <DepositLeverageTokenForm /> : <WithdrawLeverageTokenForm />}</div>
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
