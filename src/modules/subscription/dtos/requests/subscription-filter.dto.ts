import { BaseFilterRequest } from "../../../core/base-filter.request";

export class SubscriptionFilterRequest extends BaseFilterRequest {
  subscriptionName?: string;
  userId?: string;
}
