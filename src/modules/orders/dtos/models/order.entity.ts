import { MidtransTransactionStatus } from "../../../midtrans/enums/midtrans-transaction-status.enum";
import { User } from "../../../users/dtos/models/user.entity";
import { ShippingAddress } from "../../../users/interfaces/shipping-address.interface";
import { OrderStatus } from "../../enums/order-status.enum";
import { PaymentStatus } from "../../enums/payment-status.enum";
import { orderDetails } from "./order-details.model";

export class Order {
  readonly _id?: string;

  orderId?: string;

  orderCode?: string;

  /**
   * Midtrans Transaction ID.
   */
  midtransTransactionId: string;

  midtransTransactionStatus: MidtransTransactionStatus;

  paymentMethod?: string;

  userId?: string;

  userDetails?: User;

  orderDetails?: orderDetails[];

  shippingAddress: ShippingAddress;

  shippingFee: number;

  adminFee?: number;

  totalPrice?: number;

  courier: string;

  /**
   * Nomer Resi
   */
  trackingNumber?: string;

  public orderStatus?: OrderStatus;

  rejectReason?: string;

  public createdBy?: string;

  public updatedBy?: string;

  orderPaidAt?: string;

  orderExpiredAt?: string;

  orderCreatedAt?: string;

  orderRefundedAt?: string;

  createdAt?: Date;

  updatedAt?: Date;

  callback_token?: string;

  redirect_url?: string;

  // DESIGN CARD
  cardName?: string;
  cardImage?: string;
}
