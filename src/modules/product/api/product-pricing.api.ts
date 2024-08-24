import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../api/api.types";
import { ProductFilterRequest } from "../dtos/requests/product-filter.request";
import { ProductPricing } from "../entity/product-pricing.entity";
import { Product } from "../entity/product.entity";

export const productPricingApi = createApi({
  reducerPath: "productPricingApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    createProductPricing: builder.mutation<BaseResponse<ProductPricing>, ProductPricing>({
      query: (data) => {
        return {
          method: "POST",
          url: "/api/product-pricings",
          data,
        };
      },
    }),
    updateProductPricing: builder.mutation<BaseResponse<ProductPricing>, ProductPricing>({

      query: (data) => {

        return {
          method: "PUT",
          url: `/api/product-pricings/${data._id}`,
          data,
        };
      }
    }),
    getAllProductPricings: builder.query<
      PaginationResponse<ProductPricing[]>,
      ProductFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/products",
          params: data,
        };
      },
    }),
    getProductPricingDetail: builder.query<BaseResponse<ProductPricing>, { productId: string }>({
      query: (data) => {
        return {
          method: "GET",
          url: `/api/products/${data.productId}`,

        };
      },
    }),
    deleteProductPricing: builder.mutation<BaseResponse<ProductPricing>, { productId: string }>({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/api/products/${data.productId}`,
        };
      }
    }),
  })
});

export const {
  useCreateProductPricingMutation,
  useUpdateProductPricingMutation,
  useGetAllProductPricingsQuery,
  useGetProductPricingDetailQuery,
} = productPricingApi;
