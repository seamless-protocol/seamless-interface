import { useContext } from "react";
import { TabContext, TabContextType } from "./TabContext";

export const useTab = <T extends {}>(): TabContextType<T> => {
  const context = useContext<TabContextType<T> | undefined>(TabContext);

  if (context === undefined) {
    throw new Error("useTab must be used within a TabProvider");
  }

  return context;
};
