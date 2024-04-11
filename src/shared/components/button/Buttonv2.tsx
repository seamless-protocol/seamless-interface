import React from "react";

export interface ButtonProps2 extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "normal" | "big";
  fullWidth?: boolean;
  loading?: boolean;
  variant?: "text" | "outlined" | "contained";
}

export const Buttonv2: React.FC<ButtonProps2> = ({
  size = "normal",
  fullWidth = false,
  variant = "contained",
  className = "",
  type = "button",
  loading,
  children,
  ...props
}) => {
  const sizeClasses = {
    small: "py-1 md:py-2 lg:py-2",
    normal: "py-3 md:py-4 lg:py-5",
    big: "py-5 md:py-6 lg:py-7",
  };

  const variantClasses = {
    text: "bg-transparent hover:bg-gray-100 text-metalic border-none",
    outlined: "bg-transparent hover:bg-gray-100 text-metalic border border-metalic",
    contained: "hover:bg-primary-dark bg-metalic text-neutral-0",
  };

  const buttonClasses = `${props.disabled || loading ? "bg-neutral-100 border border-black text-black cursor-default" : variantClasses[variant]} ${sizeClasses[size]} 
    ${fullWidth ? "w-full" : ""} flex items-center
     justify-center space-x-2 text-center rounded-[100px] ${className}`;

  return (
    <button
      className={`${buttonClasses}`}
      type={type}
      disabled={props.disabled || loading}
      {...props}
      onClick={(e) => {
        if (props.disabled || loading) return;
        props.onClick?.(e);
      }}
    >
      {children}
      {loading && <span className="loading-spinner ml-1.5" />}
    </button>
  );
};
