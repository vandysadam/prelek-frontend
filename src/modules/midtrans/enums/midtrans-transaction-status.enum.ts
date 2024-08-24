/**
 * Midtrans Transaction Status
 * Refrence: [Midtrans Transaction Status]{@link https://docs.midtrans.com/en/after-payment/http-notification?id=status-definition}
 */
export enum MidtransTransactionStatus {
  /**
   * Transaction is successful and card balance is captured successfully.
   * If no action is taken by you, the transaction will be successfully settled on the same day or the next day or within your agreed settlement time with your partner bank. Then the transaction status changes to settlement.
   * It is safe to assume a successful payment.
   */
  CAPTURE = 'capture',

  /**
   * The transaction is successfully settled. Funds have been credited to your account
   */
  SETTLEMENT = 'settlement',

  /**
   * The transaction is created and is waiting to be paid by the
   * customer at the payment providers like Direct debit, Bank Transfer,
   * E-money, and so on. For card payment method: waiting for customer
   * to complete (and card issuer to validate) 3DS/OTP process.
   */
  PENDING = 'pending',

  /**
   * The credentials used for payment are rejected by the payment provider
   * or Midtrans Fraud Detection System (FDS).
   * To know the reason and details for the denied transaction, see the
   * status_message in the response.
   */
  DENY = 'deny',

  /**
   * The transaction is canceled. It can be triggered by merchant.
   * You can trigger Cancel status in the following cases:
   * 1. If you cancel the transaction after Capture status.
   * 2. If you deny a transaction after Challenge status.
   * If you fail to respond to a transaction with Challenge status within
   * one day, it is automatically canceled by Midtrans.
   */
  CANCEL = 'cancel',

  /**
   * The transaction is not available for processing, because the payment
   * was delayed.
   */
  EXPIRE = 'expire',

  /**
   * The transaction is marked to be refunded. Refund status can be
   * triggered by merchant.
   */
  REFUND = 'refund',

  /**
   * The transaction is marked to be refunded partially (if you choose
   * to refund in amount less than the paid amount). Refund status can
   * be triggered by merchant.
   */
  PARTIAL_REFUND = 'partial_refund',

  /**
   * Only available specifically only if you are using pre-authorize
   * feature for card transactions (an advanced feature that you will
   * not have by default, so in most cases are safe to ignore).
   * Transaction is successful and card balance is reserved (authorized)
   * successfully. You can later perform API “capture” to change it into
   * capture, or if no action is taken will be auto released. Depending
   * on your business use case, you may assume authorize status as a
   * successful transaction.
   */
  AUTHORIZE = 'authorize',
}
