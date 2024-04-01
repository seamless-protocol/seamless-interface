import React from "react";

const TabButton: React.FC<{
  label: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ label, isSelected, onClick }) => {
  return (
    <button
      type="button"
      className={`flex-1 xsm:px-24 sm:flex-initial justify-center p-3 rounded-md ${isSelected ? "bg-primary-contrast" : "bg-transparent"}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default TabButton;
