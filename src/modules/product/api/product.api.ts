import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../api/api.types";
import { CreateProductWPricingRequest } from "../dtos/requests/create-product-with-pricing.request";
import { ProductFilterRequest } from "../dtos/requests/product-filter.request";
import { Product } from "../entity/product.entity";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    /* deprecated, use createProductWPricing instead. */
    createProduct: builder.mutation<BaseResponse<Product>, Product>({
      query: (data) => {
        return {
          method: "POST",
          url: "/api/products",
          data,
        };
      },
    }),
    createProductWPricing: builder.mutation<
      BaseResponse<Product>,
      CreateProductWPricingRequest
    >({
      query: (data) => {
        return {
          method: "POST",
          url: "/api/products/create",
          data,
        };
      },
    }),
    updateProduct: builder.mutation<BaseResponse<Product>, Product>({
      query: (data) => {
        const formData = new FormData();
        for (const key in data) {
          if (data[key]) {
            formData.append(key, data[key]);
          }
        }
        return {
          method: "PUT",
          url: `/api/products/${data._id}`,
          data: formData,
        };
      },
    }),
    getAllProducts: builder.query<
      PaginationResponse<Product[]>,
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
    getProductDetail: builder.query<
      BaseResponse<Product>,
      { productId: string }
    >({
      query: (data) => {
        return {
          method: "GET",
          url: `/api/products/${data.productId}`,
        };
      },
    }),
    getProduct: builder.mutation<BaseResponse<Product>, { productId: string }>({
      query: (data) => {
        return {
          method: "GET",
          url: `/api/products/${data.productId}`,
        };
      },
    }),
    deleteProduct: builder.mutation<
      BaseResponse<Product>,
      { productId: string }
    >({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/api/products/${data.productId}`,
        };
      },
    }),
  }),
});

export const {
  useCreateProductMutation,
  useCreateProductWPricingMutation,
  useUpdateProductMutation,
  useGetAllProductsQuery,
  useGetProductDetailQuery,
  useGetProductMutation,
  useDeleteProductMutation,
} = productApi;
