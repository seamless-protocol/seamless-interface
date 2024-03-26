import React from "react";
import { useTab } from "../../contexts/tab-context/useTabContext";

interface TabButtonProps<T> {
  tab: T;
  children: React.ReactNode;
}

// Use the generic type parameter T when defining the component
export const TabButton = <T extends string>({
  tab,
  children,
}: TabButtonProps<T>) => {
  const { activeTab, setActiveTab } = useTab<T>();

  return (
    <button
      onClick={() => setActiveTab(tab)}
      className={`min-w-32 relative ${
        activeTab === tab
          ? "border-b-navy-1000 z-20 mb-[-0.5px] border-b-thin"
          : "text-navy-400"
      }`}
    >
      {children}
    </button>
  );
};
