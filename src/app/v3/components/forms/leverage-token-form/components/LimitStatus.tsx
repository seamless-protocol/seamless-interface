import { FlexRow, Typography } from "@shared";
import { useLeverageTokenFormContext } from "../leverage-token-form-provider/LeverageTokenFormProvider";

const STATUS_CONFIG: Record<string, { bgClass: string; textColor: string; message: string }> = {
  highUtilization: {
    bgClass: "bg-yellow-200",
    textColor: "text-black",
    message:
      "Underlying lending market utilization is currently HIGH. Consider waiting for utilization to decrease before depositing into this Leverage Token.",
  },
  highBorrowRate: {
    bgClass: "bg-red-200",
    textColor: "text-black",
    message:
      "Underlying lending market borrow rate is currently HIGH. Consider waiting for the borrow rate to decrease before depositing into this Leverage Token.",
  },
  depositLimitExceeded: {
    bgClass: "bg-red-500",
    textColor: "text-white",
    message: "The deposit amount exceeds the current Leverage Token recommended deposit cap.",
  },
};

export const LimitStatusComponent = () => {
  const { limitStatus } = useLeverageTokenFormContext();

  if (limitStatus === "normal" || !STATUS_CONFIG[limitStatus]) {
    return null;
  }

  const { bgClass, textColor, message } = STATUS_CONFIG[limitStatus];

  return (
    <div className="flex justify-center px-2 md:px-0">
      <div className="w-full max-w-page-content">
        <div
          className={`
            flex flex-col justify-center items-center 
            text-center w-full md:flex-row py-4 px-8 
            rounded-[100px] ${bgClass} ${textColor}
          `}
        >
          <FlexRow className="md:gap-1 gap-4 items-center justify-center w-full">
            <Typography type="bold2">{message}</Typography>
          </FlexRow>
        </div>
      </div>
    </div>
  );
};
