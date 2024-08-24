import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../api/api.types";
import { ProductFilterRequest } from "../dtos/requests/product-filter.request";
import { ProductFamily } from "../entity/product-family.entity";

export const productFamilyApi = createApi({
  reducerPath: "productFamilyApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    createProductFamily: builder.mutation<BaseResponse<ProductFamily>, ProductFamily>({
      query: (data) => {
        return {
          method: "POST",
          url: "/api/ProductFamilys",
          data,
        };
      },
    }),
    updateProductFamily: builder.mutation<BaseResponse<ProductFamily>, ProductFamily>({

      query: (data) => {
        const formData = new FormData();
        for (const key in data) {
          formData.append(key, data[key]);
        }
        return {
          method: "PUT",
          url: `/api/product-families/${data._id}`,
          data: formData,
        };
      }
    }),
    getAllProductFamilies: builder.query<
      PaginationResponse<ProductFamily[]>,
      ProductFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/product-families",
          params: data,
        };
      },
    }),
    getProductFamilyDetail: builder.query<BaseResponse<ProductFamily>, { id: string }>({
      query: (data) => {
        return {
          method: "GET",
          url: `/api/product-families/${data.id}`,

        };
      },
    }),
  }),
});

export const {
  useCreateProductFamilyMutation,
  useGetAllProductFamiliesQuery,
  useGetProductFamilyDetailQuery,
  useUpdateProductFamilyMutation,
} = productFamilyApi;
