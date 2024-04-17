import { useContext } from "react";
import { EarnFormContext, EarnFormContextType } from "./EarnFormContext";

export const useEarnFormContext = (): EarnFormContextType => {
  const context = useContext(EarnFormContext);

  if (context === undefined) {
    throw new Error("useFormContext must be used within a EarnFormProvider");
  }

  return context;
};
