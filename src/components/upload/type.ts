import { ReactNode } from 'react';
import { DropzoneOptions } from 'react-dropzone';
// @mui
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
  fileExtension?: string;
  fullName?: string;
  url?: string;
  mime_type?: string;
}

export interface FileProp {
  _id?: string;
  url: string;
  size: number | undefined;
  type: string;
  base64Data?: string;
  base64String?: string;
  fileExtension?: string;
  fullName?: string;
  fileSize?: number;
}

export interface UploadProps extends DropzoneOptions {
  error?: boolean;
  file: FileProp | string; //CustomFile | string | null;
  helperText?: ReactNode;
  sx?: SxProps<Theme>;
}

export interface UploadMultiFileProps extends DropzoneOptions {
  label?: string;
  files: (File | string)[];
  error?: boolean;
  isCompressing?: boolean;
  showPreview?: boolean;
  sx?: SxProps<Theme>;
  helperText?: ReactNode;
  onUpload?: VoidFunction;
  onRemove?: (file: File | string) => void;
  onRemoveAll?: VoidFunction;
  placeholder?: string;
}
