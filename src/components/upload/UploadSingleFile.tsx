import React from 'react';
import { useDropzone } from 'react-dropzone';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
// type
import { UploadProps } from './type';
//
// import Image from '../Image';
import RejectionFiles from './RejectionFiles';
import BlockContent from './BlockContent';
// import { CircularProgressWithLabel } from '../animate/variants/CircularProgress';
import { convertBytesToMB } from '../../utils/convertByteToMBString';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';

// ----------------------------------------------------------------------

// const DropZoneStyle = styled('div')(({ theme }) => ({
//   outline: 'none',
//   overflow: 'hidden',
//   position: 'relative',
//   padding: theme.spacing(0, 1),
//   transition: theme.transitions.create('padding'),
//   backgroundColor: theme.palette.background.paper,
//   border: `2px dashed ${theme.palette.grey[500_32]}`,
//   '&:hover': { opacity: 0.72, cursor: 'pointer' }
// }));
const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  position: 'relative',
  padding: theme.spacing(0, 1),
  borderRadius: 20,
  backgroundColor: '#F5F5F5',
  border: `1px dashed #65676B`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

// ----------------------------------------------------------------------

interface Props extends UploadProps {
  placeholder?: string;
  uploading?: boolean;
  onRemove: () => void;
  isCompressing?: boolean;
  progress?: number;
  label?: string;
}

export default function UploadSingleFile({
  error = false,
  file,
  helperText,
  sx,
  placeholder,
  uploading,
  disabled,
  onRemove,
  isCompressing,
  progress,
  label,
  ...other
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other
  });
  let fileExtension = '';
  let fileUrl = '';
  let fileSize = 0;
  let fileName = '';
  if (typeof file === 'string') {
    const tmpExt = file.split('.').pop();
    const tmpname = file.split('/').pop();
    // console.log('tmpname', tmpname);
    fileExtension = ['jpg', 'jpeg', 'png', 'gif'].includes(tmpExt)
      ? 'image'
      : ['pdf'].includes(tmpExt)
      ? 'application'
      : 'file';
    fileUrl = file;
    fileSize = 0;
    fileName = tmpname;
  } else {
    fileExtension = file.fileExtension.split('/')[0];
    fileUrl = file.url;
    fileSize = file.size;
    fileName = file.fullName;
  }
  return (
    <Grid container spacing={fileUrl === '' ? 0 : { xs: 0, md: 5 }} sx={{ width: '100%', ...sx }}>
      <Grid item md={fileUrl === '' ? 12 : 10} xs={fileUrl === '' ? 12 : 10}>
        {/* CircularProgressWithLabel */}
        <h2 className="font-medium text-gray-800 mt-1">
          {label ? label : 'Upload file'}
          <span className="text-gray-400 font-medium text-sm ml-1 pt-1"></span>
        </h2>
        <DropZoneStyle
          {...(!disabled && getRootProps())}
          sx={{
            ...(isDragActive && { opacity: 0.72 }),
            ...((isDragReject || error) && {
              color: 'error.main',
              borderColor: 'error.light',
              bgcolor: 'error.lighter'
            }),
            ...(file &&
              fileExtension === 'image' && {
                padding: '7% 0'
              })
          }}>
          {/* <input {...getInputProps()} /> */}
          {isCompressing && <CircularProgress value={progress ?? 0} />}
          {!isCompressing && <input {...getInputProps()} />}
          {((!isCompressing && fileUrl === '') || uploading) && (
            <BlockContent placeholder={placeholder} uploading={uploading} />
          )}

          {file && fileExtension === 'image' && !uploading && (
            <>
              <Box
                sx={{
                  // height: '100%',
                  width: '100%',
                  height: { xs: '100%', md: 250 },
                  // position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 0,
                  left: 0,
                  borderRadius: 1
                  // backgroundColor: '#00000014',
                }}>
                {/* <a href={file.url ?? '#'} target={'_blank'}> */}
                <img alt="preview" src={fileUrl ?? '#'} style={{ height: '100%' }} />
                {/* </a> */}
              </Box>
              {fileSize > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    borderRadius: 1,
                    backgroundColor: '#0E8478',
                    opacity: 0.8,
                    py: 0.5,
                    px: 1,
                    color: 'white'
                  }}>
                  {`File size ${convertBytesToMB(fileSize)}`}
                </Box>
              )}
            </>
          )}
          {!isCompressing && fileExtension === 'application' && !uploading && (
            <Box
              sx={{
                flex: 1,
                '&:hover': { backgroundColor: '#00000014' }
              }}>
              <Stack
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
                direction={{ xs: 'column', md: 'row' }}
                sx={{
                  textAlign: { xs: 'center', md: 'left' },
                  padding: '8px',
                  borderRadius: '10px'
                }}
                flex={1}>
                <Stack direction="row" gap={2}>
                  <Stack direction="column" justifyContent="center">
                    {/* <img
                      src={`/icons/pdf-icon.svg`}
                      alt=""
                      style={{ width: '30px', height: '30px' }}
                    /> */}
                    <InsertDriveFileIcon
                      sx={{ width: 28, height: 28, color: 'text.secondary', mr: 2 }}
                    />
                  </Stack>
                  <Stack direction="column" alignItems={'flex-start'}>
                    <Typography sx={{ fontSize: '13px' }}>{fileName}</Typography>
                    <Typography sx={{ fontSize: '13px' }}>
                      {/* {`${file.size !== undefined && Math.floor(file.size / 28)}KB`} */}
                      {fileSize ? `File size ${convertBytesToMB(fileSize)}` : '-'}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          )}
        </DropZoneStyle>
      </Grid>
      {!isCompressing && fileUrl !== '' && (
        <Grid item md={2} xs={2}>
          <Button
            sx={{
              color: !isMobile ? '#fff' : '#FF170F',
              backgroundColor: !isMobile ? '#FF170F' : 'transparent',
              ':hover': {
                backgroundColor: '#FF4842'
              }
            }}
            disabled={disabled}
            onClick={onRemove}>
            {/* Remove */}
            {!isMobile ? 'Remove' : <DeleteIcon fontSize="large" />}
          </Button>
        </Grid>
      )}
      {!isCompressing && fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}
      {helperText && helperText}
    </Grid>
  );
}
