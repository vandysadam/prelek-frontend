import { PlanRenewalType } from "../../enums/plan-renewal-type.enum";

export class CreateProductPricing {
  _id?: string;

  productId?: string;

  /**
   * Plan Name
   * @example "subscription premium 1 month"
   */
  planName: string;

  hasFreeTrial?: boolean;

  freeTrialType?: PlanRenewalType;

  freeTrialDuration?: number;

  planPrice?: number = 0;

  planRenewalType?: PlanRenewalType;

  /**
   * the number of units between each renewal for recurring billing schedule, e.g. 2
   */
  planRenewalInterval?: number = 1;
}
