import { BaseFilterRequest } from "../../../../core/base-filter.request";

export class GetCompanyNameAndIdFilterRequest extends BaseFilterRequest {
  picId?: string;

  companyName?: string;

  creatorId?: string;
}
