import React from "react";
import classNames from "classnames";
import get from "lodash.get";

import {
  RegisterOptions,
  DeepMap,
  FieldError,
  UseFormRegister,
  Path,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Input, InputProps } from "./InputField";
import { FormErrorMessage } from "./FormErrorMessage";
import { SelectField, SelectFieldProps } from "./SelectField";

export type FormSelectProps<TFormValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<SelectFieldProps, "name">;

export const FormSelect = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  ...props
}: FormSelectProps<TFormValues>): JSX.Element => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div className={classNames("", className)} aria-live="polite">
      <SelectField
        name={name}
        aria-invalid={hasError}
        className={classNames({
          "transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600":
            hasError,
        })}
        {...props}
        {...(register && register(name, rules))}
      />
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
        )}
      />
    </div>
  );
};
