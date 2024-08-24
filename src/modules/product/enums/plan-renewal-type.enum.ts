export enum PlanRenewalType {
  /**
   * One time payment
   */
  LIFETIME = "lifetime",

  /**
   * Renewal every  "x" day
   */
  DAILY = "daily",

  /**
   * Renewal every "x" week
   */
  WEEKLY = "weekly",

  /**
   * Renewal every "x" month
   */
  MONTHLY = "monthly",

  /**
   * Renewal every "x" year
   */
  YEARLY = "yearly",
}
