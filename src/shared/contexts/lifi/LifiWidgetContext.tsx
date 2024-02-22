import React, { createContext, useState, PropsWithChildren } from "react";

interface LiFiWidgetContextType {
  isOpen: boolean;
  toggle: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContextValue: LiFiWidgetContextType = {
  isOpen: false,
  toggle: () => {},
  setIsOpen: (_) => {},
};

export const LifiWidgetContext =
  createContext<LiFiWidgetContextType>(defaultContextValue);

export const LifiWidgetProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const contextValue = {
    isOpen,
    toggle: () => {
        setIsOpen(v => !v);
    },
    setIsOpen,
  };

  return (
    <LifiWidgetContext.Provider value={contextValue}>
      {children}
    </LifiWidgetContext.Provider>
  );
};
