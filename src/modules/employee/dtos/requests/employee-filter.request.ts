import { BaseFilterRequest } from '../../../core/base-filter.request';

export interface EmployeeFilterRequest extends BaseFilterRequest {
  readonly _id?: string;
}
