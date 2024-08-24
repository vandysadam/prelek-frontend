import React from 'react';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps, InputAdornment, useTheme, SxProps } from '@mui/material';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
};

type Props = IProps & TextFieldProps;
export default function RHFTextField({ name, ...other }: Props) {
  const theme = useTheme();

  const { control, watch } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error?.message}
          onChange={(e) => {
            field.onChange(e.target.value);
          }}
          // InputProps={{
          //   startAdornment: [
          //     'phone',
          //     'data_entry_mobile',
          //     'entity_mobile',
          //     'ceo_mobile',
          //     'chairman_mobile',
          //     'pm_mobile',
          //     'mobile_number'
          //   ].includes(name) ? (
          //     <InputAdornment
          //       position="start"
          //       sx={{
          //         ...sxStyling
          //       }}>
          //       +966
          //     </InputAdornment>
          //   ) : ['bank_account_number'].includes(name) ? (
          //     <InputAdornment
          //       position="start"
          //       sx={{
          //         ...sxStyling
          //       }}>
          //       SA
          //     </InputAdornment>
          //   ) : null
          // }}
          {...other}
          sx={{
            '& > .MuiFormHelperText-root': {
              backgroundColor: 'white'
            },
            ...(!other.disabled && {
              '& label.Mui-focused': {
                color: theme.palette.grey[800]
              },
              '& .MuiInputLabel-root': {
                color: theme.palette.grey[800]
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'inherit'
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main
                }
              }
            })
          }}
        />
      )}
    />
  );
}
