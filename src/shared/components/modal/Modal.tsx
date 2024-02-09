import React, {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { Button, ButtonProps } from "../button/Button";
import { Icon } from "../images/Icon";

import xButton from "../../../assets/x-button.svg";
import { FlexRow } from "../containers/FlexRow";
import { Typography } from "../text/Typography/Typography";

interface ModalProps {
  children: ReactNode;
  buttonProps?: ButtonProps;
  buttonText: string;
  header?: string;
  icon?: string; // Make icon optional
  iconProps?: {
    width: number;
    height: number;
  };
  onOpen?: () => void;
  onClose?: () => void;
  fullScreen?: boolean;
}
export interface ModalHandles {
  close: () => void;
}

export const Modal = forwardRef<ModalHandles, ModalProps>(
  (
    {
      children,
      buttonProps,
      buttonText,
      icon,
      onOpen,
      onClose,
      fullScreen,
      iconProps,
      header,
    },
    ref
  ) => {
    const [isModalOpen, setModalOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      close: () => {
        setModalOpen(false);
        if (onClose) onClose();
      },
    }));

    const handleOverlayMouseDown = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      if (event.target === event.currentTarget) {
        setModalOpen(false);
        if (onClose) onClose();
      }
    };

    return (
      <>
        <Button
          {...buttonProps}
          onClick={() => {
            setModalOpen(true);
            if (onOpen) onOpen();
          }}
        >
          {buttonText}
          {icon && (
            <Icon
              src={icon}
              alt={"button-" + icon}
              width={iconProps ? iconProps.width : 4}
              height={iconProps ? iconProps.height : 4}
            />
          )}
        </Button>

        {isModalOpen && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto transition-opacity duration-225 ease-in-out ${
              fullScreen
                ? "w-full h-full bg-black bg-opacity-50"
                : "bg-black bg-opacity-50"
            }`}
            style={{ opacity: isModalOpen ? 1 : 0 }}
            onMouseDown={handleOverlayMouseDown}
          >
            <div
              className={`relative max-w-[420px] w-full rounded-md mx-auto 
              bg-white shadow-lg p-6 transition-opacity duration-225 ease-in-out ${
                fullScreen ? "w-full h-full" : ""
              }`}
              style={{ opacity: isModalOpen ? 1 : 0 }}
              onClick={(e) => e.stopPropagation()}
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
        )}
      </>
    );
  }
);

Modal.displayName = "Modal";
