import { User } from '../../../../users/dtos/models/user.entity';
import { BaseFilter } from '../../../../api/api.types';

export interface CompanyFilterRequest extends BaseFilter {
  readonly _id?: string;
  picId?: string;
  picData?: User;
  companyName?: string;
  companyAddress?: string;
  creatorId?: string;
  createdBy?: User;
}
