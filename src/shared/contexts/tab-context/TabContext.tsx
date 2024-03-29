import { createContext, ReactNode, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface TabProviderProps<T> {
  children: ReactNode;
  defaultTab: T;
  disableUrlSyncing?: boolean;
  overrideUrlSlug?: string;
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
  overrideUrlSlug = "tab",
}: TabProviderProps<T>) => {
  const location = useLocation();
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(location.search);
  const tabFromUrl = urlSearchParams.get(overrideUrlSlug) as T | null;

  const initialTab = !disableUrlSyncing && tabFromUrl ? tabFromUrl : defaultTab;
  const [activeTab, setActiveTab] = useState<T>(initialTab);

  useEffect(() => {
    if (!disableUrlSyncing) {
      const currentUrlParams = new URLSearchParams(location.search);
      currentUrlParams.set(overrideUrlSlug, activeTab);
      navigate({ search: currentUrlParams.toString() }, { replace: true });
    }
  }, [activeTab, disableUrlSyncing, navigate, location.search]);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};
