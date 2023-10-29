import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: "blue" | "green" | null;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
};

export default function Button({
  children,
  className,
  style,
  variant,
  onClick,
  isLoading,
  disabled,
  type,
}: ButtonProps) {
  const buttonClass = clsx(
    {
      "text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 disabled:bg-blue-400 font-medium rounded-lg text-sm px-5 py-2.5":
        variant === "blue",
      "text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 disabled:bg-green-400 font-medium rounded-lg text-sm px-5 py-2.5":
        variant === "green",
    },
    className
  );
  return (
    <button
      {
        ...(
          (onClick && !isLoading) && {
            onClick,
          }
        )
      }
      className={buttonClass}
      style={style}
      disabled={isLoading || disabled}
      type={type}
    >
      {isLoading ? <>Loading...</> : children}
    </button>
  );
}
