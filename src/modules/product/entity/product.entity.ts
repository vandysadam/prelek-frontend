import { User } from "../../users/dtos/models/user.entity";
import { ProductType } from "../enums/product-type.enum";
import { ProductPricing } from "./product-pricing.entity";

export class Product {
  readonly _id?: string;

  productName?: string;

  productPrice?: number;

  pricings?: ProductPricing[];

  productType?: ProductType;

  productDescription?: string;

  productImageUrl?: string;

  productBenefits?: string[] = [];

  hidden?: boolean;

  stock?: number;

  creatorId?: string;

  createdBy?: string | User;

  productImage?: File | string | ArrayBuffer;
}
