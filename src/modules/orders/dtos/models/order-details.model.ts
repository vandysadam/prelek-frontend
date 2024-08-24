import { Product } from "../../../product/entity/product.entity";

export class orderDetails {
  productId: string;

  quantity: number;

  subTotal: number;

  productDetails?: Product;
}
