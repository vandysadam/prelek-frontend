import React from 'react';

import { useDropzone } from 'react-dropzone';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Button } from '@mui/material';
// type
//
import BlockContent from './BlockContent';
import RejectionFiles from './RejectionFiles';
import MultiFilePreview from './MultiFilePreview';
import { UploadMultiFileProps } from './type';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  padding: theme.spacing(5, 1),
  borderRadius: 20,
  backgroundColor: '#F5F5F5',
  border: `1px dashed #65676B`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

// ----------------------------------------------------------------------

export default function UploadMultiFile({
  error,
  showPreview = false,
  files,
  onUpload,
  onRemove,
  onRemoveAll,
  helperText,
  placeholder,
  isCompressing,
  label,
  // disabled,
  sx,
  ...other
}: UploadMultiFileProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    ...other
  });
  // console.log('isCompressing', isCompressing);

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <h2 className="font-medium text-gray-800 mt-1">
        {label ? label : 'Upload file'}
        <span className="text-gray-400 font-medium text-sm ml-1 pt-1"></span>
      </h2>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter'
          })
        }}>
        <input {...getInputProps()} />

        <BlockContent placeholder={placeholder} />
      </DropZoneStyle>

      {fileRejections && fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}

      <MultiFilePreview
        disabled={other.disabled}
        files={files}
        showPreview={showPreview}
        onRemove={onRemove}
        isCompressing={isCompressing}
      />

      {files && files.length > 0 && (
        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button
            variant="contained"
            size="small"
            onClick={onRemoveAll}
            disabled={other.disabled}
            sx={{
              color: '#fff',
              backgroundColor: '#FF170F',
              // '&:hover': { color: '#fff', backgroundColor: 'red' }
              ':hover': {
                backgroundColor: '#FF4842',
                boxShadow: 'none'
              },
              boxShadow: 'none'
            }}>
            Remove all
          </Button>
          {/* <Button size="small" variant="contained" onClick={onUpload}>
            Upload files
          </Button> */}
        </Stack>
      )}

      {helperText && helperText}
    </Box>
  );
}
