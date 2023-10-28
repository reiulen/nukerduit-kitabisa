import clsx from "clsx";
import React, { forwardRef, ForwardedRef } from "react";
import Input from "./Input";
type InputLabelProps = {
  label: string;
  className?: string;
  classNameLabel?: string;
  placeholder?: string;
  classNameInput?: string;
  type?: string;
  error?: string | null;
};

const InputLabel = forwardRef(
  (
    {
      label,
      className,
      classNameLabel,
      placeholder,
      classNameInput,
      type,
      error,
      ...props
    }: InputLabelProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={className}>
        <label
          className={clsx(
            classNameLabel,
            "block mb-2 text-sm font-medium text-gray-900",
            {
              "text-red-500": error,
            }
          )}
        >
          {label}
        </label>
        <Input
          error={error}
          type={type}
          placeholder={placeholder}
          className={classNameInput}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default InputLabel;
