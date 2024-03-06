import React, { ReactNode } from "react";
import xButton from "../../../assets/common/x-button.svg";
import { FlexRow } from "../containers/FlexRow";
import { Icon } from "../images/Icon";
import { Typography } from "../text/Typography/Typography";

interface ModalBodyProps {
  children: ReactNode;
  header?: string;
  fullScreen?: boolean;
  setModalOpen: (isOpen: boolean) => void;
  className?: string;
}

export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  header,
  fullScreen,
  setModalOpen,
  className = "",
}) => {
  const handleOverlayMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      setModalOpen(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto transition-opacity duration-225 ease-in-out ${
        fullScreen
          ? "w-full h-full bg-black bg-opacity-50"
          : "bg-black bg-opacity-50"
      } ${className}`}
      style={{ opacity: 1 }}
      onMouseDown={handleOverlayMouseDown}
    >
      <div
        className={`relative max-w-[420px] w-full rounded-md mx-auto 
        bg-white shadow-lg p-6 transition-opacity duration-225 ease-in-out ${
          fullScreen ? "w-full h-full" : ""
        }`}
        style={{ opacity: 1 }}
      >
        <FlexRow className="items-center justify-between mb-6">
          <Typography type="h2">{header}</Typography>
          <button
            className="hover:bg-action-focus rounded-full p-2"
            type="button"
            onClick={() => setModalOpen(false)}
          >
            <Icon src={xButton} alt="button-x" width={20} height={20} />
          </button>
        </FlexRow>

        {children}
      </div>
    </div>
  );
};
