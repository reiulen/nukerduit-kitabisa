import React from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import Select, { StylesConfig } from "react-select";
import clsx from "clsx";

type OptionType = {
  value: string;
  label: string;
  data?: {
    [key: string]: string | number | boolean | undefined | null;
  } | null;
};

type SelectLabel = {
  label: string;
  error?: string | null;
  name: string;
  classNameForm?: string;
  classNameLabel?: string;
  className?: string;
  placeholder?: string;
  option: OptionType[];
  isLoading?: boolean;
  control: Control;
  rules?: RegisterOptions;
  getOptionLabel: (option: OptionType) => JSX.Element;
  onInputChange: (value: string) => void;
}

type CustomStyles = StylesConfig<OptionType, false>;

export default function SelectLabel({
  label,
  error,
  name,
  classNameForm,
  classNameLabel,
  className,
  placeholder,
  option,
  isLoading,
  control,
  rules,
  getOptionLabel,
  onInputChange,
}: SelectLabel) {
  const customStyles: CustomStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "0.5px solid rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      padding: "0.5rem 0.3rem",
      fontSize: "14px",
      focus: state.isFocused ? "none" : "none",
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
      color: "#000",
      padding: "10px 16px",
      cursor: "pointer",
      backgroundColor: state.isSelected ? "#F5F5F5" : "#fff",
      borderRadius: "10px",
      "&:hover": {
        backgroundColor: "#F5F5F5",
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#000",
      border: "none !important",
    }),
    menu: (provided) => ({
      ...provided,
      boxShadow: "0px 0px 10px rgba(70, 52, 52, 0.15)",
      borderRadius: "10px",
      zIndex: 100,
    }),
  };

  return (
    <div className={classNameForm}>
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
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Select
            {...field}
            options={option}
            className={className}
            placeholder={placeholder}
            isSearchable={true}
            isLoading={isLoading}
            isClearable={true}
            getOptionLabel={getOptionLabel}
            styles={customStyles}
            onInputChange={onInputChange}
          />
        )}
      />
      {error && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
}
