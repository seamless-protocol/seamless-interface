import { ReactNode, forwardRef, useImperativeHandle, useState } from "react";
import { Button, ButtonProps } from "../button/Button";

import { ModalBody } from "./ModalBody";

interface ModalProps {
  children: ReactNode;
  buttonProps?: ButtonProps;
  buttonText?: string;
  header?: string;
  icon?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  fullScreen?: boolean;
  className?: string;
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
      header,
      className,
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
          {icon && icon}
        </Button>

        {isModalOpen && (
          <ModalBody
            header={header}
            fullScreen={fullScreen}
            setModalOpen={setModalOpen}
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
