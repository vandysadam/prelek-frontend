import React from 'react';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText } from '@mui/material';
// type
import { useCallback, useState } from 'react';
import { CustomFile, FileProp, UploadMultiFileProps, UploadProps } from '../upload/type';
import { UploadMultiFile } from '../upload';
import { useCompress } from '../../utils/browser-image-compression';
import { encodeBase64Upload } from '../../utils/getBase64';
import { getValue } from '@mui/system';
import { nanoid } from '@reduxjs/toolkit';
import UploadSingleFile from '../upload/UploadSingleFile';
// ----------------------------------------------------------------------

interface Props extends Omit<UploadProps, 'file'> {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
}

// ----------------------------------------------------------------------

export function RHFUploadSingle({ name, placeholder, disabled, label, ...other }: Props) {
  const { control, setValue } = useFormContext();
  const { progress, isCompressing, compress } = useCompress();

  const handleDrop = async (acceptedFiles: File[]) => {
    const fileType = acceptedFiles[0].type.split('/')[0];
    // console.log('acceptedFiles[0].type', fileType);
    if (fileType === 'application') {
      const fileBuffer = await encodeBase64Upload(acceptedFiles[0]);
      setValue(name, {
        url: URL.createObjectURL(acceptedFiles[0]),
        type: acceptedFiles[0].type,
        size: fileBuffer.length,
        base64String: fileBuffer,
        fullName: acceptedFiles[0].name,
        fileExtension: acceptedFiles[0].type
      });
    } else if (fileType === 'image') {
      const compressFile = compress(acceptedFiles[0], {
        maxSizeMB: 1,
        maxWidthOrHeight: 900,
        useWebWorker: false
      });
      compressFile
        .then(async (compresedFile) => {
          const fileBuffer = await encodeBase64Upload(compresedFile);
          setValue(name, {
            url: URL.createObjectURL(acceptedFiles[0]),
            size: fileBuffer.length,
            base64String: fileBuffer,
            fullName: acceptedFiles[0].name,
            fileExtension: acceptedFiles[0].type
          });
        })
        .catch((err) => {
          console.error('Unable to compress file', err);
        });
    }
  };

  const onRemove = () => {
    setValue(name, {
      url: '',
      type: '',
      size: '',
      fileExtension: ''
    });
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error;
        return (
          <UploadSingleFile
            placeholder={placeholder ?? ''}
            file={field.value}
            error={checkError}
            disabled={isCompressing ? true : disabled}
            isCompressing={isCompressing}
            progress={progress}
            label={label}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error.message}
                </FormHelperText>
              )
            }
            {...other}
            onDrop={handleDrop}
            // uploading={uploading}
            onRemove={onRemove}
          />
        );
      }}
    />
  );
}

interface RHFUploadMultiFileProps extends Omit<UploadMultiFileProps, 'files'> {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  // maxFiles?: number;
}

export function RHFUploadMultiFile({
  name,
  placeholder,
  disabled,
  // maxFiles,
  ...other
}: RHFUploadMultiFileProps) {
  const { progress, isCompressing, compress } = useCompress();
  const { control, getValues, setValue, watch } = useFormContext();
  const tmp = watch(name);
  const handleDrop = async (acceptedFiles: File[]) => {
    const images = getValues(name);
    const generateId = nanoid(4);
    const newImages = await Promise.all(
      acceptedFiles.map(async (file) => {
        const fileType = file.type.split('/')[0];
        const preview = URL.createObjectURL(file);
        if (fileType === 'application') {
          const base64String = await encodeBase64Upload(file);

          return {
            _id: generateId,
            ...file,
            preview,
            base64String,
            fullName: file.name,
            fileExtension: file.type,
            size: file.size
          };
        } else if (fileType === 'image') {
          const compressFile = compress(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 900,
            useWebWorker: false
          });
          const tmpFile = await compressFile
            .then(async (compresedFile) => {
              const fileBuffer = await encodeBase64Upload(compresedFile);
              return {
                _id: generateId,
                ...file,
                preview,
                base64String: fileBuffer,
                fullName: file.name,
                fileExtension: file.type,
                size: file.size
              };
            })
            .catch((err) => {
              console.error('Unable to compress file', err);
            });
          return tmpFile;
        } else {
          const base64String = await encodeBase64Upload(file);
          return {
            _id: generateId,
            ...file,
            preview,
            base64String,
            fullName: file.name,
            fileExtension: file.type,
            size: file.size
          };
        }
      })
    );
    if (images) {
      setValue(name, [...images, ...newImages]);
    } else {
      setValue(name, [...newImages]);
    }
  };
  const handleRemoveAll = () => {
    setValue(name, []);
  };
  const handleRemove = (file: any) => {
    const filterImages = tmp.filter((item) => item._id !== file._id);
    setValue(name, filterImages);
  };
  // console.log('isCompressing', isCompressing);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && field.value?.length === 0;

        return (
          <UploadMultiFile
            accept={{
              // 'image/*': [],
              'image/png': [],
              'image/jpeg': [],
              'image/jpg': [],
              'application/pdf': []
            }}
            maxSize={1024 * 1024 * 10}
            // multiple={other.multiple}
            // maxFiles={1}
            files={field.value}
            showPreview
            placeholder={placeholder ?? ''}
            disabled={disabled || isCompressing}
            error={checkError}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error?.message}
                </FormHelperText>
              )
            }
            {...other}
            onDrop={handleDrop}
            onRemoveAll={handleRemoveAll}
            onRemove={handleRemove}

            // isCompressing={isCompressing}
          />
        );
      }}
    />
  );
}
