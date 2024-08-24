import { UserRoleEnum } from '../../../users/enums/user-role.enum';
import { IdTypeEnum } from '../../enums/id-type.enum';

export interface UpdateEmployeeDto {
  employee_id: string;
  avatar_url?: any;

  name?: string;

  email?: string;

  password?: string;

  phone?: string; // (00) 00000-0000

  address?: string;

  city?: string;

  state?: string;

  country?: string;

  birth_date?: Date | null | string;

  joined_date?: Date | null | string;

  resigned_date?: Date | null | string;

  id_type?: IdTypeEnum;

  id_number?: string; // KTP number, Passport number, etc.

  postal_code?: string; // 00000-000

  citizen?: string; // Indonesian, Singaporean, etc.

  // role?: UserRoleEnum; // Indonesian, Singaporean, etc.
  role?: string; // employee, company_admin, etc.

  company_id: string; // Company ID
  bio?: string;
}
