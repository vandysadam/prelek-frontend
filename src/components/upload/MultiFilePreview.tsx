import React from 'react';

import { AnimatePresence, m } from 'framer-motion';
// @mui
import { Box, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { alpha } from '@mui/material/styles';
// utils
// type
import { UploadMultiFileProps } from './type';
//
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import Image from '../Image';
// import { varFade } from '../animate';
import { fData } from '../../utils/formatNumber';
import getFileData from '../../utils/getFileData';
// import Image from '../Image';

// ----------------------------------------------------------------------

export default function MultiFilePreview({
  showPreview = false,
  files,
  onRemove,
  disabled
}: // isCompressing,
UploadMultiFileProps) {
  // console.log('files', files);
  const hasFile = (files && files.length > 0) ?? false;
  return (
    <List disablePadding sx={{ ...(hasFile && { my: 3 }) }}>
      {/* <AnimatePresence> */}
      {files &&
        typeof files !== 'string' &&
        files.length > 0 &&
        files.map((file, index) => {
          const { key, name, size, preview, fileExtension, fullName, type, mimeType, url } =
            getFileData(file, index);
          const extPrefix = fileExtension
            ? fileExtension?.split('/')[0]
            : mimeType
            ? mimeType?.split('/')[0]
            : type?.split('/')[0];

          // if (extPrefix === 'aplication') {
          //   return (
          //     <ListItem
          //       key={key}
          //       // index={index}
          //       // component={m.div}
          //       // todo for animation
          //       // {...varFade().inRight}
          //       sx={{
          //         my: 1,
          //         px: 2,
          //         py: 0.75,
          //         borderRadius: 0.75,
          //         border: (theme) => `solid 1px ${theme.palette.divider}`
          //       }}>
          //       {onRemove && (
          //         <IconButton
          //           size="small"
          //           onClick={() => onRemove(file)}
          //           sx={{
          //             top: 6,
          //             p: '2px',
          //             right: 6,
          //             position: 'absolute',
          //             color: 'common.white',
          //             bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
          //             '&:hover': {
          //               bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48)
          //             }
          //           }}>
          //           <CloseIcon />
          //         </IconButton>
          //       )}
          //     </ListItem>
          //   );
          // }
          if (extPrefix === 'image') {
            return (
              <ListItem
                key={key}
                // index={index}
                // component={m.div}
                // todo for animation
                // {...varFade().inRight}
                sx={{
                  p: 0,
                  m: 0.5,
                  width: 80,
                  height: 80,
                  borderRadius: 1.25,
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'inline-flex',
                  border: (theme) => `solid 1px ${theme.palette.divider}`
                }}>
                {/* <img alt="preview" src={preview} /> */}
                {/* <Image alt="preview" src={preview} ratio="1/1" /> */}
                <Box sx={{ widht: 80, height: 80 }}>
                  <a href={preview ?? url} target={'_blank'}>
                    <img alt="preview" src={preview ?? url} style={{ height: '100%' }} />
                  </a>
                </Box>
                {/* {isCompressing ? (
                    <CircularProgress size={24} />
                  ) : (
                    <Image alt="preview" src={preview} ratio="1/1" />
                  )} */}

                {!disabled && onRemove && (
                  <IconButton
                    size="small"
                    onClick={() => onRemove(file)}
                    sx={{
                      top: 6,
                      p: '2px',
                      right: 6,
                      position: 'absolute',
                      color: 'common.white',
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                      '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48)
                      }
                    }}>
                    <CloseIcon />
                  </IconButton>
                )}
              </ListItem>
            );
          }
          // if (showPreview) {

          // }

          return (
            <ListItem
              key={key}
              // component={m.div}
              // todo for animation
              // {...varFade().inRight}
              sx={{
                my: 1,
                px: 2,
                py: 0.75,
                borderRadius: 0.75,
                border: (theme) => `solid 1px ${theme.palette.divider}`
              }}>
              <a href={preview ?? url} target={'_blank'}>
                <InsertDriveFileIcon
                  sx={{ width: 28, height: 28, color: 'text.secondary', mr: 2 }}
                />
                <ListItemText
                  primary={fullName ?? name}
                  secondary={typeof file === 'string' ? '' : fData(size || 0)}
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </a>

              {!disabled && onRemove && (
                <IconButton
                  size="small"
                  onClick={() => onRemove(file)}
                  sx={{
                    top: 'auto',
                    p: '2px',
                    right: 6,
                    position: 'absolute',
                    color: 'common.white',
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                    '&:hover': {
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48)
                    }
                  }}>
                  <CloseIcon />
                </IconButton>
              )}
            </ListItem>
          );
        })}
      {/* </AnimatePresence> */}
    </List>
  );
}
