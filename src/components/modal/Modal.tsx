import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");

    if (modalRoot && elRef.current) {
      modalRoot.appendChild(elRef.current);

      const cleanup = () => {
        if (modalRoot && elRef.current) {
          modalRoot.removeChild(elRef.current);
        }
      };

      return cleanup;
    }
  }, []);

  return createPortal(<div>{children}</div>, elRef.current!);
};
