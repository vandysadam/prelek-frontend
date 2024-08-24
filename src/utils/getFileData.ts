// components

import { CustomFile } from '../components/upload/type';

// ----------------------------------------------------------------------

export default function getFileData(file: CustomFile | string, index?: number) {
  // console.log('file', file);
  if (typeof file === 'string') {
    return {
      key: index ? `${file}-${index}` : file,
      preview: file
    };
  }
  return {
    key: index ? `${file.name}-${index}` : file.name,
    name: file.name,
    size: file.size,
    path: file.path,
    type: file.type,
    url: file.url,
    mimeType: file.mime_type,
    fileExtension: file.fileExtension,
    fullName: file.fullName,
    preview: file.preview,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate
  };
}
