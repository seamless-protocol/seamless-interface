import React, { ReactNode } from "react";
import xButton from "../../../assets/common/x-button.svg";
import { Icon } from "../images/Icon";

import { IS_STYLE_VERSION_2 } from "../../../globals";
import { Typography } from "../text/Typography/Typography";

interface ModalBodyProps {
  children: ReactNode;
  header?: string;
  headerComponent?: ReactNode;
  fullScreen?: boolean;
  setModalOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  className?: string;
  size?: "small" | "normal" | "big";
}

const sizeMapper = {
  small: "max-w-[420px]",
  normal: "max-w-[540px]",
  big: "max-w-[660px]",
};

export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  header,
  fullScreen,
  headerComponent,
  setModalOpen,
  onClose,
  size = "small",
  className = "",
}) => {
  const handleOverlayMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      setModalOpen(false);

      if (onClose) onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto 
      transition-opacity duration-200 ease-in-out bg-black bg-opacity-50
      ${fullScreen ? "w-full h-full" : ""} ${className}`}
      style={{ opacity: 1 }}
      onMouseDown={handleOverlayMouseDown}
    >
      <div
        className={`relative ${sizeMapper[size]} w-full rounded-md mx-auto bg-white shadow-lg p-6 
      transition-opacity duration-200 ease-in-out ${fullScreen ? "w-full h-full" : ""}`}
        style={{ opacity: 1 }}
      >
        <div className="flex flex-row items-start justify-between mb-6">
          {headerComponent || <Typography type={IS_STYLE_VERSION_2 ? "bold4" : "h2"}>{header}</Typography>}
          <button
            className="hover:bg-action-focus rounded-full p-2"
            type="button"
            onClick={() => {
              setModalOpen(false);
              onClose?.();
            }}
          >
            <Icon src={xButton} alt="button-x" width={20} height={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};
