import { createContext, ReactNode, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface TabProviderProps<T> {
  children: ReactNode;
  defaultTab: T;
  disableUrlSyncing?: boolean; // Optional flag to disable URL syncing
}

export interface TabContextType<T> {
  activeTab: T;
  setActiveTab: (tab: T) => void;
}

export const TabContext = createContext<TabContextType<any> | undefined>(
  undefined
);

export const TabProvider = <T extends string>({
  children,
  defaultTab,
  disableUrlSyncing = false,
}: TabProviderProps<T>) => {
  const location = useLocation();
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(location.search);
  const tabFromUrl = urlSearchParams.get("tab") as T | null;

  const initialTab = !disableUrlSyncing && tabFromUrl ? tabFromUrl : defaultTab;
  const [activeTab, setActiveTab] = useState<T>(initialTab);

  useEffect(() => {
    if (!disableUrlSyncing) {
      const currentUrlParams = new URLSearchParams(location.search);
      currentUrlParams.set("tab", activeTab);
      navigate({ search: currentUrlParams.toString() }, { replace: true });
    }
  }, [activeTab, disableUrlSyncing, navigate, location.search]);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};
