export interface UploadFileBase64Dto {
  base64String: string;
  fullName: string;
  fileExtension: string;
  /* in bytes, why not from buffer?, buffer length on base 64 is not accurate */
  size: number | undefined;
}
