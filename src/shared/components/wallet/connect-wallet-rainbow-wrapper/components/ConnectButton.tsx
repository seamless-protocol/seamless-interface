import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const ConnectButtonStyled: React.FC<ButtonProps> = ({
  className = "",
  children,
  ...other
}) => {
  return (
    <button
      className={`box-border  border-solid border-thin 
  border-other-borderButton text-white bg-primary-main hover:bg-background-header
    rounded px-3 py-1.5 transition-all duration-250 ease-in-out ${className}`}
      {...other}
    >
      {children}
    </button>
  );
};
