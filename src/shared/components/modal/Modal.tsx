import { ReactNode, forwardRef, useImperativeHandle, useState } from "react";
import { Button, ButtonProps } from "../button/Button";
import { Icon } from "../images/Icon";

import { ModalBody } from "./ModalBody";

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
          <ModalBody
            header={header}
            fullScreen={fullScreen}
            setModalOpen={setModalOpen}
          >
            {children}
          </ModalBody>
        )}
      </>
    );
  }
);

Modal.displayName = "Modal";
