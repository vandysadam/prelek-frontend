import { BaseFilterRequest } from "../../../core/base-filter.request";

export class ProductFilterRequest extends BaseFilterRequest {
  productName?: string;
  productPrice?: number;
  productDescription?: string;
  productImageUrl?: string;
  productBenefits?: string[];
  hidden?: boolean;
  creatorId?: string;
  createdBy?: string;
}