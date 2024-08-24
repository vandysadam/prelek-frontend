import { DropzoneOptions, useDropzone } from "react-dropzone";
import { Control, Controller } from "react-hook-form";
import React from "react";

import {
  DeepMap,
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export type FormInputProps<TFormValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  label?: string;
  id?: string;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  className?: string;
  placeholder?: string;
  control?: Control<TFormValues>;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  accept?: DropzoneOptions["accept"];
} & Omit<DropzoneOptions, "name">;

export const FormDropzone = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  multiple,
  maxFiles,
  maxSize,
  accept,
  control,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  return (
    <Controller
      render={({ field: { onChange } }) => (
        <Dropzone
          disabled={props.disabled}
          multiple={multiple}
          onChange={(e) =>
            onChange(multiple ? e.target.files : e.target.files[0])
          }
          maxFiles={maxFiles}
          maxSize={maxSize}
          accept={accept}
          {...props}
        />
      )}
      name={name}
      control={control}
    />
  );
};

// const thumbsContainer = {
//   display: "flex",
//   flexDirection: "row",
//   flexWrap: "wrap",
//   marginTop: "16px",
// } as CSSProperties;

// const thumb = {
//   display: "inline-flex",
//   borderRadius: "2px",
//   border: "1px solid #eaeaea",
//   marginBottom: "8px",
//   marginRight: "8px",
//   width: "100px",
//   height: "100px",
//   padding: "4px",
//   boxSizing: "border-box",
// } as CSSProperties;

// const thumbInner = {
//   display: "flex",
//   minWidth: 0,
//   overflow: "hidden",
// } as CSSProperties;

// const img = {
//   display: "block",
//   width: "auto",
//   height: "100%",
//   objectFit: "contain",
// } as CSSProperties;

const Dropzone = ({ multiple, onChange, disabled, ...rest }) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple,
    ...rest,
  });

  return (
    <div className={`${disabled && "opacity-50"}`}>
      <div
        {...getRootProps({ className: "dropzone" })}
        className={`${
          disabled ? "pointer-events-none" : "cursor-pointer"
        } border rounded-md text-black/50 flex items-center justify-center`}
      >
        <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
          <span className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="font-medium text-gray-600">
              Drop files to Attach, or &nbsp;
              <span className="text-blue-600 underline">browse</span>
            </span>
          </span>
        </label>
        <input {...getInputProps({ onChange })} />
        {/* <BiImageAdd className="w-8 h-8" strokeWidth={0} /> */}
      </div>
      {/* <aside style={thumbsContainer}>
        {files.length === 0 && initialValue && (
          <div style={thumb}>
            <div style={thumbInner}>
              <img alt="" src={initialValue} style={img} />
            </div>
          </div>
        )}

        {thumbs}
      </aside> */}
    </div>
  );
};
