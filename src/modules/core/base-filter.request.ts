export class BaseFilterRequest {
  /**
   * The page number.
   */

  page?: number = 1;

  /**
   * The page limit.
   *
   * @default 10
   *
   * @example 10
   *
   */
  limit?: number = 10;
}
