import React, { CSSProperties, InputHTMLAttributes, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { Property } from "node_modules/csstype";
import { toast } from "react-toastify";
import { BiImageAdd } from "react-icons/bi";
import {
  RegisterOptions,
  DeepMap,
  FieldError,
  UseFormRegister,
  Path,
} from "react-hook-form";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: "16px",
} as CSSProperties;

const thumb = {
  display: "inline-flex",
  borderRadius: "2px",
  border: "1px solid #eaeaea",
  marginBottom: "8px",
  marginRight: "8px",
  width: "100px",
  height: "100px",
  padding: "4px",
  boxSizing: "border-box",
} as CSSProperties;

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
} as CSSProperties;

const img = {
  display: "block",
  width: "auto",
  height: "100%",
  objectFit: "contain",
} as CSSProperties;

interface LocalFile extends File {
  preview: string;
}

export type FormDropzoneProps<TFormValues> = {
  name: Path<TFormValues>;
  children?: React.ReactNode;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  maxFiles?: number;
  disabled?: boolean;
  initialValue?: string;
};

/**
 * This component is configured to accept one image at the moment
 * @component
 * @example
 * // Example with formik Field
 * <Field name="portfolioUrl" component={ImageDropzone} />
 *
 * // Standalone
 * <ImageDropzone maxFiles={2} />
 */

// ... do something with the file or return it

const ImageDropzone = <TFormValues extends Record<string, unknown>>({
  children,
  maxFiles,
  disabled,
  initialValue,
}: FormDropzoneProps<TFormValues>): JSX.Element => {
  const [files, setFiles] = useState<LocalFile[]>([]);

  //   console.log(field, form);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles,
    accept: {
      "image/*": [],
      "application/pdf": [],
      "application/vnd.ms-excel": [],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length === 0) {
        toast.warn(`Please select ${maxFiles} file(s)`);
        return;
      }

      // form?.setFieldValue(field.name, acceptedFiles[0], true);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    disabled,
  });

  const thumbs = files.map((file, key) => (
    <div style={thumb} key={key}>
      <div style={thumbInner}>
        <img
          alt=""
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  return (
    <div className={`${disabled && "opacity-50"}`}>
      <div
        {...getRootProps({ className: "dropzone" })}
        className={`${
          disabled ? "pointer-events-none" : "cursor-pointer"
        } border rounded-md text-black/50 flex items-center justify-center py-5 border-dashed`}
      >
        <input {...getInputProps()} />
        <BiImageAdd className="w-8 h-8" strokeWidth={0} />
      </div>
      <aside style={thumbsContainer}>
        {files.length === 0 && initialValue && (
          <div style={thumb}>
            <div style={thumbInner}>
              <img alt="" src={initialValue} style={img} />
            </div>
          </div>
        )}

        {thumbs}
      </aside>
    </div>
  );
};

export default ImageDropzone;
