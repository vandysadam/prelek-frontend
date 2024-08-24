import { Order } from "../../orders/dtos/models/order.entity";
import { ProductPricing } from "../../product/entity/product-pricing.entity";
import { PlanRenewalType } from "../../product/enums/plan-renewal-type.enum";
import { User } from "../../users/dtos/models/user.entity";
import { SubscriptionStatus } from "../enums/subscription-status.enum";

export class Subscription {
  public readonly _id?: string;

  userId: User;

  userDetails?: User;

  choosedPricingId: ProductPricing;

  pricingDetails?: ProductPricing;

  orderId: Order;

  orderDetails?: Order;

  startAt?: Date;

  endAt?: Date;

  subscriptionRenewalType: PlanRenewalType;

  subscriptionRenewalInterval: number;

  cancelledAt?: Date;

  public createdAt: Date;

  public updatedAt: Date;

  subscriptionStatus?: SubscriptionStatus;
}
