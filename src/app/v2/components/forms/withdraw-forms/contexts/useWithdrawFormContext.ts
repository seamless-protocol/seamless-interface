import { useContext } from "react";
import { WithdrawFormContext, WithdrawFormContextType } from "./WithdrawFormContext";

export const useWithdrawFormContext = (): WithdrawFormContextType => {
  const context = useContext(WithdrawFormContext);

  if (context === undefined) {
    throw new Error("useWithdrawFormContext must be used within a WithdrawFormProvider");
  }

  return context;
};
