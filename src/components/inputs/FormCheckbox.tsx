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

export type FormCheckboxProps<TFormValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  checkboxStyle?: "row" | "column";
} & Omit<InputProps, "name">;

export const FormCheckbox = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  checkboxStyle = "row",
  ...props
}: FormCheckboxProps<TFormValues>): JSX.Element => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div className={classNames("", className)} aria-live="polite">
      {checkboxStyle && checkboxStyle === "row" ? (
        <div className="flex flex-row justify-between">
          <label className="block text-left text-gray-700 text-sm mb-2 pt-2">
            {props.label}
          </label>
          <input
            type={"checkbox"}
            aria-invalid={hasError}
            {...(register && register(name, rules))}
          />
        </div>
      ) : (
        <div>
          <label className="block text-left text-gray-700 text-sm mb-2">
            {props.label}
          </label>
          <input
            type={"checkbox"}
            aria-invalid={hasError}
            {...(register && register(name, rules))}
          />
        </div>
      )}

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
