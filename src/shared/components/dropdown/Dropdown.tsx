import React from "react";

interface Props {
  button?: React.ReactNode;
  children?: React.ReactNode;
}

export const Dropdown: React.FC<Props> = ({ button, children }) => {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button">
        {button}
      </div>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] menu p-0 shadow bg-base-100 rounded-[4px] min-w-52"
      >
        {children}
      </div>
    </div>
  );
};
