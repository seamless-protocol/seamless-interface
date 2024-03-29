import React, { ReactNode } from "react";
import xButton from "../../../assets/common/x-button.svg";
import { Icon } from "../images/Icon";

import modalStylesV1 from "./styles/Modal.v1.module.css";
import modalStylesV2 from "./styles/Modal.v2.module.css";
import { IS_STYLE_VERSION_2 } from "../../../globals";
import { Typography } from "../text/Typography/Typography";

interface ModalBodyProps {
  children: ReactNode;
  header?: string;
  fullScreen?: boolean;
  setModalOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  className?: string;
}

export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  header,
  fullScreen,
  setModalOpen,
  onClose,
  className = "",
}) => {
  const styles = IS_STYLE_VERSION_2 ? modalStylesV2 : modalStylesV1;

  const handleOverlayMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      setModalOpen(false);

      if (onClose) onClose();
    }
  };

  return (
    <div
      className={`${styles.modalBackground} ${fullScreen ? "w-full h-full" : ""} ${className}`}
      style={{ opacity: 1 }}
      onMouseDown={handleOverlayMouseDown}
    >
      <div className={`${styles.root} ${fullScreen ? "w-full h-full" : ""}`} style={{ opacity: 1 }}>
        <div className={styles.header}>
          <Typography type="h2">{header}</Typography>
          <button
            className="hover:bg-action-focus rounded-full p-2"
            type="button"
            onClick={() => {
              setModalOpen(false);
              onClose && onClose();
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
