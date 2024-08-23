import React, { useState, ReactNode, createContext } from "react";
import { Address } from "viem";

export interface FormSettingsContextType {
  hideTag?: boolean;
  onTransaction?: () => void;
  strategy?: Address;
  setStrategy: (strategy?: Address) => void;
  targetMultiply?: string;
  setTargetMultiply: (targetMultiply?: string) => void;
}

export const FormSettingsContext = createContext<FormSettingsContextType | undefined>(undefined);

interface FormSettingsProviderProps {
  children: ReactNode;
  defaultStrategy?: Address;
  onTransaction?: () => void;
  defaultTargetMultiply?: string;
}

export const FormSettingsProvider: React.FC<FormSettingsProviderProps> = ({
  children,
  defaultStrategy,
  onTransaction,
  defaultTargetMultiply,
}) => {
  const [strategy, setStrategy] = useState<Address | undefined>(defaultStrategy);
  const [targetMultiply, setTargetMultiply] = useState<string | undefined>(defaultTargetMultiply);

  return (
    <FormSettingsContext.Provider
      value={{
        strategy,
        setStrategy,
        onTransaction,
        targetMultiply,
        setTargetMultiply,
      }}
    >
      {children}
    </FormSettingsContext.Provider>
  );
};
