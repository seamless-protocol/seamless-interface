import { FlexCol, FlexRow, Typography } from "@shared";
import { FormSettingsProvider } from "../../../../components/forms/contexts/FormSettingsContext";
import { WithdrawForm } from "../../../../components/forms/withdraw-form/WithdrawForm";
import { useParams } from "react-router-dom";
import { Address } from "viem";

export const FormContainer: React.FC = () => {
  const { address } = useParams();
  const strategy = address as Address | undefined;

  return (
    <FlexCol className="bg-neutral-0 shadow-card p-6 gap-6 rounded-2xl w-full">
      <FlexRow className="items-center gap-1">
        <div className="cursor-not-allowed">
          <LocalButtonSwitcher data-cy="deposit-button" className="cursor-not-allowed" isActive={false} disabled>
            Deposit
          </LocalButtonSwitcher>
        </div>

        <LocalButtonSwitcher data-cy="withdraw-button" isActive>
          Withdraw
        </LocalButtonSwitcher>
      </FlexRow>
      <div>
        <FormSettingsProvider defaultStrategy={strategy}>
          <WithdrawForm />
        </FormSettingsProvider>
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
