import classNames from "classnames";
import React, {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

export type SelectFieldProps = {
  children: ReactNode;
  label?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  ref?: React.Ref<HTMLSelectElement>;
  size?: InputSize;
} & Omit<
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
  "size"
>;

export type InputSize = "small" | "medium" | "large";

const sizeMap: { [key in InputSize]: string } = {
  small: "p-2 text-sm",
  medium: "p-3 text-base",
  large: "p-4 text-base",
};

export const SelectField: React.FC<SelectFieldProps> = forwardRef<
  HTMLSelectElement,
  SelectFieldProps
>((props, ref) => {
  const {
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    disabled,
    required,
    className,
    size = "medium",
    ...rest
  } = props;
  return (
    <div className={`${className}`}>
      <label htmlFor={name}>{label}</label>
      <select
        ref={ref}
        name={name}
        className={classNames([
          "relative inline-flex w-full rounded leading-none transition-colors ease-in-out placeholder-gray-500 text-gray-700 bg-gray-50 border border-gray-300 hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-400 focus:ring-4 focus:ring-opacity-30",
          sizeMap[size],
          className,
        ])}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        {...rest}
      >
        {props.children}
      </select>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
});
SelectField.displayName = "SelectField";
