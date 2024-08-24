import { PlanRenewalType } from "../enums/plan-renewal-type.enum";

export class ProductPricing {
  _id?: string;

  productId?: string;

  // productDetails?: Product;

  /**
   * Plan Name
   * @example "subscription premium 1 month"
   */
  planName: string;

  hasFreeTrial?: boolean = false;

  freeTrialType?: PlanRenewalType | "" = "";

  freeTrialDuration?: number | undefined = undefined;

  planPrice?: number | undefined = undefined;

  planRenewalType?: PlanRenewalType;

  /**
   * the number of units between each renewal for recurring billing schedule, e.g. 2
   */
  planRenewalInterval?: number | undefined = undefined;

  createdAt?: Date;

  updatedAt?: Date;
}
