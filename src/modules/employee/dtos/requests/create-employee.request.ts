import { UploadFileBase64Dto } from '../../../../utils/upload-file-base64.dto';
import { CompanyRoleEnum, UserRoleEnum } from '../../../users/enums/user-role.enum';
import { IdTypeEnum } from '../../enums/id-type.enum';

export interface CreateEmployeeDto {
  company_id: string; // Company ID
  /*Personal Information*/
  avatar_url?: UploadFileBase64Dto | string;
  // avatar_image_file?: File | null;
  name: string;
  email: string;
  phone: string; // (00) 00000-0000
  birth_date?: Date | null | string;
  citizen?: string; // Indonesian, Singaporean, etc.
  id_type?: IdTypeEnum;
  id_number: string; // KTP number, Passport number, etc.
  password?: string | undefined;

  role?: string;

  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string; // 00000-000
  joined_date?: Date | null | string; // Date of resignation from the company
  resigned_date?: Date | null | string; // Date of resignation from the company
  bio?: string;
}
