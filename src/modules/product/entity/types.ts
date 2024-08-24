import { ProductPricing } from "./product-pricing.entity";

export interface tmpProductPricing extends ProductPricing {
  flags?: "new" | "updated" | "deleted";
}

export interface ProductPricingState {
  productPricings: tmpProductPricing[];
  createdPricings: tmpProductPricing[];
  updatedPricings: tmpProductPricing[];
  deletedPricings: tmpProductPricing[];
  tmpProductPricings: tmpProductPricing[];
}
