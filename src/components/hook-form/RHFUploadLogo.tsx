import React from 'react';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  useTheme,
  SxProps,
  FormHelperText
} from '@mui/material';
import UploadLogo from '../upload/UploadLogo';
import { CustomFile } from '../upload/type';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  label?: string;
  placholder?: string;
};

type Props = IProps & TextFieldProps;
export default function RHFUploadLogo({ name, label, placeholder, ...other }: Props) {
  const theme = useTheme();

  const { control, setValue } = useFormContext();

  const handleUpload = (file: CustomFile) => {
    // console.log('file', file);
    setValue(name, file);
  };

  const handleRemove = () => {
    setValue(name, {
      url: '',
      type: '',
      size: ''
    });
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && field.value?.length === 0;

        return (
          <UploadLogo
            // accept={{
            //   // 'image/*': [],
            //   'image/png': [],
            //   'image/jpeg': [],
            //   'image/jpg': [],
            //   'application/pdf': []
            // }}
            // maxSize={1024 * 1024 * 3}
            // files={field.value}
            // showPreview
            // placeholder={placeholder ?? ''}
            label={label}
            placholder={placeholder}
            file={field.value}
            disabled={other.disabled}
            // error={checkError}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error?.message}
                </FormHelperText>
              )
            }
            {...other}
            // onDrop={handleDrop}
            // onRemoveAll={handleRemoveAll}
            onUpload={handleUpload}
            onRemove={handleRemove}

            // isCompressing={isCompressing}
          />
        );
      }}
    />
  );
}
