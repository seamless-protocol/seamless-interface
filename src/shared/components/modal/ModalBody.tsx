import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import xButton from "../../../assets/common/x-button.svg";
import { Icon } from "../images/Icon";
import { Typography } from "../text/Typography/Typography";

interface ModalBodyProps {
  children: ReactNode;
  header?: string;
  headerComponent?: ReactNode;
  fullScreen?: boolean;
  setModalOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  className?: string;
  size?: "small" | "normal" | "big" | "biger";
  showCloseButton?: boolean;
}

const sizeMapper = {
  small: "max-w-[420px]",
  normal: "max-w-[540px]",
  big: "max-w-[690px]",
  biger: "max-w-[1020px]",
};

export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  header,
  fullScreen,
  headerComponent,
  setModalOpen,
  onClose,
  showCloseButton = true,
  size = "small",
  className = "",
}) => {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget && showCloseButton) {
      setModalOpen(false);
      if (onClose) onClose();
      event.stopPropagation();
      event.preventDefault();
    }
  };

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto 
      transition-opacity duration-200 ease-in-out bg-black bg-opacity-50
      ${fullScreen ? "w-full h-full" : ""} ${className}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`relative ${sizeMapper[size]} w-full rounded-md mx-auto bg-white shadow-lg p-6 
      transition-opacity duration-200 ease-in-out max-h-[92%] overflow-y-auto ${fullScreen ? "w-full h-full" : ""}
      scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row items-start justify-between mb-6">
          {headerComponent || <Typography type="bold4">{header}</Typography>}
          {showCloseButton && (
            <button
              className="hover:bg-action-focus relative z-50 rounded-full p-2"
              type="button"
              onClick={() => {
                setModalOpen(false);
                if (onClose) onClose?.();
              }}
            >
              <Icon data-cy="close-modal" src={xButton} alt="Close" width={20} height={20} />
            </button>
          )}
        </div>

        {children}
      </div>
    </div>,
    document.body
  );
};
