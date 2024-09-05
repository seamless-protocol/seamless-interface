import React, { ReactNode, forwardRef, useImperativeHandle, useMemo, useState, useEffect } from "react";
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
  size?: "small" | "normal" | "big" | "biger";
  button?: React.ReactNode;
}
export interface ModalHandles {
  close: () => void;
}

export const Modal = forwardRef<ModalHandles, ModalProps>(
  ({ children, buttonProps, headerComponent, onOpen, onClose, fullScreen, header, className, size, button }, ref) => {
    const [isModalOpen, setModalOpen] = useState(false);

    // Handle modal close via the Escape key
    useEffect(() => {
      const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isModalOpen) {
          setModalOpen(false);
          if (onClose) {
            onClose();
          }
        }
      };

      if (isModalOpen) {
        document.addEventListener("keydown", handleEscKey);
      }

      return () => {
        document.removeEventListener("keydown", handleEscKey);
      };
    }, [isModalOpen, onClose]);

    useImperativeHandle(ref, () => ({
      close: () => {
        setModalOpen(false);
        if (onClose) {
          onClose();
        }
      },
    }));

    const buttonElement = useMemo(() => {
      if (!button) return undefined;
      return React.cloneElement(button as React.ReactElement, {
        onClick: (e: any) => {
          setModalOpen(true);
          if (onOpen) onOpen();
          e.stopPropagation();
          e.preventDefault();
        },
      });
    }, [button]);

    return (
      <>
        {buttonElement || (
          <button
            type="button"
            {...buttonProps}
            onClick={(e: any) => {
              setModalOpen(true);
              if (onOpen) onOpen();
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            {buttonProps?.children}
          </button>
        )}

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
