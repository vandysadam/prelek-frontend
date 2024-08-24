import { UploadFileBase64Dto } from "../../../../../utils/upload-file-base64.dto";

export class ApproveCompanyRequestDto {
  company_request_id: string;

  payment_file?: UploadFileBase64Dto | string | File;
  // payment_file?: File | string | ArrayBuffer;

  /**
   * PIC Name
   */
  approved_pic_name?: string;

  /**
   * Total Employee
   */
  approved_total_employee?: number | undefined;

  /**
   * company phone number
   */
  approved_company_phone?: string;

  /**
   * Company Name
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

  deal_price?: number | undefined;

  expired_date: Date | null;
}
