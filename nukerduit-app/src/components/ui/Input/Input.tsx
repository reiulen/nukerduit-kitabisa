import clsx from "clsx";
import React, { ForwardedRef, forwardRef } from "react";

type InputProps = {
  placeholder?: string;
  className?: string;
  type?: string;
  error?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const InputLabel = forwardRef(
  (
    {
      placeholder,
      className,
      type = "text",
      error,
      onChange,
      ...props
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <input
          {...(onChange && { onChange })}
          {...props}
          type={type}
          placeholder={placeholder}
          ref={ref}
          className={clsx(
            className,
            "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full py-2.5 px-4",
            {
              "border-red-500": error,
            }
          )}
        />
        {error && (
          <div className="text-red-500 text-sm mt-1">{error && error}.</div>
        )}
      </>
    );
  }
);

export default InputLabel;
