import { ReactNode, forwardRef, useImperativeHandle, useState } from "react";
import { ButtonProps } from "../button/Button";
import { ModalBody } from "./ModalBody";

interface ModalProps {
  children: ReactNode;
  buttonProps?: ButtonProps;
  buttonText?: string;
  header?: string;
  headerComponent?: React.ReactNode;
  icon?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  fullScreen?: boolean;
  className?: string;
  size?: "small" | "normal" | "big";
}
export interface ModalHandles {
  close: () => void;
}

export const Modal = forwardRef<ModalHandles, ModalProps>(
  ({ children, buttonProps, headerComponent, onOpen, onClose, fullScreen, header, className, size }, ref) => {
    const [isModalOpen, setModalOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      close: () => {
        setModalOpen(false);
        if (onClose) {
          onClose();
        }
      },
    }));

    return (
      <>
        <button
          {...buttonProps}
          onClick={() => {
            setModalOpen(true);
            if (onOpen) onOpen();
          }}
        >
          {buttonProps?.children}
        </button>

        {isModalOpen && (
          <ModalBody
            size={size}
            header={header}
            headerComponent={headerComponent}
            fullScreen={fullScreen}
            setModalOpen={setModalOpen}
            onClose={onClose}
            className={className}
          >
            {children}
          </ModalBody>
        )}
      </>
    );
  }
);

Modal.displayName = "Modal";
