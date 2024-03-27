import React from "react";
import { useTab } from "../../contexts/tab-context/useTabContext";

interface TabContentProps<T> {
  tab: T;
  children: React.ReactNode;
}

export const TabContent = <T extends string>({
  tab,
  children,
}: TabContentProps<T>) => {
  const { activeTab } = useTab<T>();

  return activeTab === tab ? <>{children}</> : null;
};
