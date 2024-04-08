import { createContext, ReactNode } from "react";
import { useQueryParam } from "use-query-params";

interface TabProviderProps<T extends string> {
  children: ReactNode;
  defaultTab: T;
  overrideUrlSlug?: string;
}

export interface TabContextType<T extends string> {
  activeTab: T;
  setActiveTab: (tab: T) => void;
}

export const TabContext = createContext<TabContextType<any> | undefined>(undefined);

export const TabProvider = <T extends string>({
  children,
  defaultTab,
  overrideUrlSlug = "tab",
}: TabProviderProps<T>) => {
  const [activeTabParam, setActiveTab] = useQueryParam(overrideUrlSlug);
  const activeTab = activeTabParam ?? defaultTab;

  return <TabContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabContext.Provider>;
};
