

export type ProductFamilyDocument = ProductFamily & Document;

export class ProductFamily {
  readonly _id?: string;


  productFamilyName: string;


  productFamilyDescription: string;

  productFamilyBenefits?: string[];

  isLimited: boolean;

  quota: number;

  /**
   * soft delete
   */
  isDeleted?: boolean;
}
