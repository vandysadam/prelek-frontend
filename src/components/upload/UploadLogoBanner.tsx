import React, { ReactNode } from 'react';

import { useDropzone } from 'react-dropzone';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Button } from '@mui/material';
// type
//
import BlockContent from './BlockContent';
import RejectionFiles from './RejectionFiles';
import MultiFilePreview from './MultiFilePreview';
import { CustomFile, UploadMultiFileProps } from './type';
import { useFilePicker } from 'use-file-picker';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { MdOutlineClose } from 'react-icons/md';
import { useCompress } from '../../utils/browser-image-compression';
import { toBase64 } from '../../utils/toBase64';

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

interface UploadLogoProps {
  onUpload: (file: any) => void;
  onRemove: VoidFunction;
  // error?: boolean;
  // logoUrl: string;
  file: CustomFile | string;
  helperText?: ReactNode;
  disabled?: boolean;
  label?: string;
  placholder?: string;
  backgroundBanner?: string;
}

export default function UploadLogoBanner({
  // error,
  onUpload,
  onRemove,
  helperText,
  disabled,
  file,
  label,
  placholder,
  backgroundBanner,
  // logoUrl,
  ...other
}: UploadLogoProps) {
  // const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
  //   ...other
  // });
  const { progress, isCompressing, compress } = useCompress();
  const [logoUrl, setLogoUrl] = React.useState<string | null>(typeof file === 'string' ? file : '');

  const [pickAvatarImage, avatarImagePicker] = useFilePicker({
    multiple: false,
    readAs: 'DataURL',
    accept: ['.png', '.jpg', 'jpeg'],
    limitFilesConfig: { min: 1, max: 1 }
  });

  const handleDrop = async (acceptedFiles: File) => {
    const compressFile = compress(acceptedFiles, {
      maxSizeMB: 1,
      maxWidthOrHeight: 900,
      useWebWorker: false
    });
    // console.log('compressFile', compressFile);
    // console.log('acceptedFiles', acceptedFiles);

    compressFile
      .then(async (compresedFile) => {
        const buffer: any = await toBase64(compresedFile);
        // console.log('buffer', buffer);
        if (!isCompressing) {
          setLogoUrl(buffer);
          const tmpFile = {
            name: compresedFile.name,
            type: compresedFile.type,
            base64String: buffer,
            fullName: compresedFile.name,
            fileExtension: compresedFile.type,
            size: buffer.length
          };
          onUpload(tmpFile);
        }
      })
      .catch((err) => {
        console.error('Unable to compress file', err);
      });
  };

  React.useEffect(() => {
    const { errors, filesContent, loading, plainFiles } = avatarImagePicker;

    if (loading) {
      return;
    }

    if (errors.length !== 0) {
      console.error(errors);
      return;
    }

    if (filesContent.length === 0) {
      return;
    }

    // console.log('plainFiles', plainFiles);

    handleDrop(plainFiles[0]);
  }, [avatarImagePicker.loading]);

  return (
    <>
      <Stack
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center  ',
          backgroundColor: `#${backgroundBanner}`
        }}>
        <Box
          sx={{
            position: 'relative',
            // width: { xs: 150, md: 500 },
            minWidth: { xs: 150, md: 500 },
            height: { xs: 150, md: 250 },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {/* <div
          aria-label="profile-picture"
          className="w-2/5 pb-[calc(40%)] relative min-w-[6rem] min-h-[6rem] mx-auto"> */}
          {/* {logoUrl && (
          <button
            className="absolute bg:white text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 w-8 h-8 rounded-full px-1.5 right-[10%] top-[10%] z-[10]"
            onClick={(e) => {
              e.preventDefault();
              onRemove();
              setLogoUrl(null);
            }}>
            <MdOutlineClose />
          </button>
        )} */}
          <img
            alt="Profile Image"
            // className="p-1 rounded-full bg-white absolute w-full h-full object-cover"
            className="p-1 absolute h-3/4	"
            src={
              (logoUrl as string) || `https://via.placeholder.com/300?text=${placholder ?? 'image'}`
            }
          />
          {/* </div> */}
        </Box>
      </Stack>
      <Stack sx={{ width: '100%', display: 'flex', alignItems: 'center  ' }}>
        <Box sx={{ width: '100%' }}>
          <Button
            disabled={isCompressing}
            fullWidth
            onClick={() => pickAvatarImage()}
            startIcon={<FileUploadIcon />}
            variant="outlined">
            {isCompressing ? <>Compressing... {progress}</> : label ? label : <> Upload Avatar</>}
          </Button>
        </Box>
        {helperText && helperText}
      </Stack>
    </>
  );
}
