import { ProductPricing } from "../../entity/product-pricing.entity";
import { Product } from "../../entity/product.entity";

export class CreateProductWPricingRequest extends Product {
  productPricing: ProductPricing[];
}
