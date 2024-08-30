import React, { useState, ReactNode, createContext } from "react";
import { Address } from "viem";

export interface FormSettingsContextType {
  hideTag?: boolean;
  onTransaction?: () => void;
  strategy?: Address;
  setStrategy: (strategy?: Address) => void;
}

export const FormSettingsContext = createContext<FormSettingsContextType | undefined>(undefined);

interface FormSettingsProviderProps {
  children: ReactNode;
  defaultStrategy?: Address;
  onTransaction?: () => void;
}

export const FormSettingsProvider: React.FC<FormSettingsProviderProps> = ({
  children,
  defaultStrategy,
  onTransaction,
}) => {
  const [strategy, setStrategy] = useState<Address | undefined>(defaultStrategy);

  return (
    <FormSettingsContext.Provider
      value={{
        strategy,
        setStrategy,
        onTransaction,
      }}
    >
      {children}
    </FormSettingsContext.Provider>
  );
};
