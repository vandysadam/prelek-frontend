import { FileProp } from '../../../../components/upload/type';
import { User } from '../../../users/dtos/models/user.entity';
import { AditionalFilesResponse } from '../dtos/resposne/aditional-files.response';

export class Company {
  _id?: string;

  /**
   * pic id (userId)
   */
  picId?: string;

  picData?: User;

  /**
   * PIC Name
   */
  picName?: string;

  /**
   * Total Employee
   */
  totalEmployee?: number;

  /**
   * company phone number
   */
  companyPhone?: string;
  companyCountryCode?: string;

  /**
   * Company Name
   */
  companyName?: string;

  /**
   * Company E-Mail
   * @example gojekxcontag@gojek.com
   */
  companyEmail?: string;

  /**
   * Company address
   */
  companyAddress?: string;

  slug?: string;

  /**
   * Created By (userId)
   */
  creatorId?: string;

  createdBy?: User;

  rejectReason?: string;

  color?: string;
  logo?: FileProp | string;

  // company file
  // companyProfileFile?: string;
  companyProfileFile?: FileProp | string;
  additional_files?: AditionalFilesResponse[];
}
