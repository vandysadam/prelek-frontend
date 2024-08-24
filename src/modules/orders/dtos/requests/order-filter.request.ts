import { BaseFilterRequest } from "../../../core/base-filter.request";
import { OrderStatus } from "../../enums/order-status.enum";
import { PaymentStatus } from "../../enums/payment-status.enum";

export class OrderFilterRequest extends BaseFilterRequest {
  paymentStatus?: PaymentStatus;
  orderStatus?: OrderStatus;
  findPendingOrders?: boolean;
}
