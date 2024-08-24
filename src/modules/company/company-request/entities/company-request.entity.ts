import { User } from "../../../users/dtos/models/user.entity";
import { Company } from "../../company/entities/company.entity";
import { CompanyRequestStatus } from "../enums/company-status.enum";

export interface CompanyRequest {
  _id: string;

  /**
   * PIC Name
   */
  requested_pic_name: string;

  /**
   * Total Employee
   */
  requested_total_employee: number;

  /**
   * company phone number
   */
  requested_company_phone: string;

  /**
   * Company Name
   */
  requested_company_name: string;

  /**
   * Company E-Mail
   * @example gojekxcontag@gojek.com
   */
  requested_company_email: string;

  /**
   * Company address
   */
  requested_company_address?: string;

  /**
   * PIC Name (when approved)
   */
  approved_pic_name?: string;

  /**
   * Total Employee (when approved)
   */
  approved_total_employee?: number;

  /**
   * Company phone number (when approved)
   */
  approved_company_phone?: string;

  /**
   * Company Name (when approved)
   */
  approved_company_name?: string;

  /**
   * Company E-Mail
   * @example gojekxcontag@gojek.com
   */
  approved_company_email?: string;

  /**
   * Company address
   */
  approved_company_address?: string;

  payment_file?: string;

  /**
   * the price of the deal
   */
  deal_price?: number | undefined;

  /**
   * company expired date
   */
  expired_date?: Date;

  status: CompanyRequestStatus;

  /**
   * pic id (userId)
   */
  company_id?: string;

  companyDetail: Company;

  /**
   * pic id (userId)
   */
  reviwer_id?: string;

  reviewerDetail: User;

  reject_reason?: string;

  rejected_at?: Date;

  approved_at?: Date;

  createdAt?: Date;

  updatedAt?: Date;
}
