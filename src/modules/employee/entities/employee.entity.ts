import { Company } from '../../company/company/entities/company.entity';
import { UserRoleEnum } from '../../users/enums/user-role.enum';
import { IdTypeEnum } from '../enums/id-type.enum';

export class Employee {
  _id: string;

  name: string;

  username: string;

  bio?: string;

  email: string;

  password: string;

  role?: UserRoleEnum;

  phone: string; // (00) 00000-0000

  address: string;

  city: string;

  state: string;

  country: string;

  zip_code: string; // 00000-000

  birth_date: Date;

  joined_date: Date; // Date of admission to the company

  // resigned_date?: Date; // Date of resignation from the company
  resigned_date?: Date;

  is_resigned: boolean; // If the employee has resigned from the company

  /*Identity & Address */

  id_type: IdTypeEnum; // KTP, Passport, etc.

  id_number: string; // KTP number, Passport number, etc.

  // id_expiration_date: Date | string; // KTP expiration date, Passport expiration date, or permanent if it is a KTP

  postal_code: string; // 00000-000

  citizen: string; // Indonesian, Singaporean, etc.

  /*Employee Data*/
  company_id?: string;

  company_detail?: Company;

  /**
   * Created By (userId)
   */
  creator_id?: string | Employee;

  created_by?: Employee;

  avatar_url: string;
  // for later on
  // department_id: string; // Department ID from the department collection

  // for latter on
  // position_id: string; // Position in the company

  // for latter on
  // employee_status_id: string; // Active, Inactive, etc.

  // employee_type_id: string; // Permanent, Contract, etc.

  // employee_level_id: string; // Employee level (Junior, Middle, Senior, etc.)

  // employee_grade_id: string; // Employee grade is the level of the employee in the company

  // employee_group_id: string; // Employee group is the group of employees in the company

  // employee_category_id: string; // Employee category is the category of employees in the company

  // employee_code: string; // Employee code in the company

  // employee_cpf: number; // Employee Capitalization Fund (CPF) in the company

  readonly created_at?: Date;

  readonly updated_at?: Date;
}
