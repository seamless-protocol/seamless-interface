import { useContext } from "react";
import { FormSettingsContext, FormSettingsContextType } from "./FormSettingsContext";

export const useFormSettingsContext = (): FormSettingsContextType => {
  const context = useContext(FormSettingsContext);

  if (context === undefined) {
    throw new Error("useFormSettingsContext must be used within a FormSettingsProvider");
  }

  return context;
};
