import { ProductPricing } from "../../entity/product-pricing.entity";
import { Product } from "../../entity/product.entity";

export class UpdateProductWPricingRequest extends Product {
  productPricing: ProductPricing[];
  createdProductPricing?: ProductPricing[];
  updatedProductPricing?: ProductPricing[];
  deletedProductPricing?: ProductPricing[];
}
