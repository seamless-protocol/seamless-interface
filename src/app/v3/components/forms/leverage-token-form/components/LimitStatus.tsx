import { FlexRow, Typography } from "@shared";
import { useLeverageTokenFormContext } from "../leverage-token-form-provider/LeverageTokenFormProvider";
import React, { ReactNode } from "react";

// We keep the same STATUS_CONFIG; keys are the three possible warnings.
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

const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex justify-center px-2 md:px-0">
    <div className="w-full max-w-page-content flex flex-col space-y-4">{children}</div>
  </div>
);

const Banner: React.FC<{
  bgClass: string;
  textColor: string;
  children: ReactNode;
}> = ({ bgClass, textColor, children }) => (
  <div
    className={`
      flex flex-col justify-center items-center
      text-center w-full md:flex-row py-4 px-8
      rounded-[100px] ${bgClass} ${textColor}
    `}
  >
    <FlexRow className="md:gap-1 gap-4 items-center justify-center w-full">{children}</FlexRow>
  </div>
);

export const LimitStatusComponent = () => {
  const { limitStatuses } = useLeverageTokenFormContext();
  const statuses = limitStatuses?.data;
  const error = limitStatuses?.error;

  if (error) {
    return (
      <Wrapper>
        <Banner bgClass="bg-red-200" textColor="text-black">
          <Typography type="bold2">Error while fetching limit statuses: {error.message}</Typography>
        </Banner>
      </Wrapper>
    );
  }

  if (!statuses || statuses.length === 0) {
    return null;
  }

  return (
    <Wrapper>
      {statuses.map((statusKey) => {
        const { bgClass, textColor, message } = STATUS_CONFIG[statusKey];
        return (
          <Banner key={statusKey} bgClass={bgClass} textColor={textColor}>
            <Typography type="bold2">{message}</Typography>
          </Banner>
        );
      })}
    </Wrapper>
  );
};
