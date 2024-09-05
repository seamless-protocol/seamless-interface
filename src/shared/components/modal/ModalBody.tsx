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
  size = "small",
  className = "",
}) => {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      setModalOpen(false);
      if (onClose) onClose();
    }
  };

  return ReactDOM.createPortal(
    // Render the modal outside the current DOM tree
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto 
      transition-opacity duration-200 ease-in-out bg-black bg-opacity-50
      ${fullScreen ? "w-full h-full" : ""} ${className}`}
      onClick={handleOverlayClick} // Handle clicks on the overlay to close modal
    >
      <div
        className={`relative ${sizeMapper[size]} w-full rounded-md mx-auto bg-white shadow-lg p-6 
      transition-opacity duration-200 ease-in-out max-h-[92%] overflow-y-auto ${fullScreen ? "w-full h-full" : ""}
      scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100`}
        onClick={(e) => e.stopPropagation()} // Stop event propagation inside the modal content
      >
        <div className="flex flex-row items-start justify-between mb-6">
          {headerComponent || <Typography type="bold4">{header}</Typography>}
          <button
            className="hover:bg-action-focus relative z-50 rounded-full p-2"
            type="button"
            onClick={() => {
              setModalOpen(false);
              if (onClose) onClose?.();
            }}
          >
            <Icon src={xButton} alt="Close" width={20} height={20} />
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body // This renders the modal as a child of the body, not the Link component
  );
};
