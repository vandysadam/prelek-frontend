import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../../api/api.types";
import { ApproveCompanyRequestDto } from "../dtos/requests/approve-company.request";
import { CompanyRequestFilterRequest } from "../dtos/requests/company-filter.request";
import { RejectCompanyRequestDto } from "../dtos/requests/reject-company.request";
import { CompanyRequest } from "../entities/company-request.entity";

export const companyRequestApi = createApi({
  reducerPath: "companyRequestApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getAllCompanyRequest: builder.query<
      PaginationResponse<CompanyRequest[]>,
      CompanyRequestFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/company-request/get-all",
          params: data,
        };
      },
    }),
    getRequestDetail: builder.query<
      BaseResponse<CompanyRequest>,
      { company_request_id: string }
    >({
      query: (data) => {
        return {
          method: "GET",
          url: `/api/company-request/get-detail/${data.company_request_id}`,
          params: data,
        };
      },
    }),
    companyRequestApprove: builder.mutation<
      BaseResponse<CompanyRequest>,
      ApproveCompanyRequestDto
    >({
      query: (data) => {
        return {
          method: "PATCH",
          url: `/api/company-request/approve`,
          data,
        };
      },
    }),
    companyRequestReject: builder.mutation<
      BaseResponse<CompanyRequest>,
      RejectCompanyRequestDto
    >({
      query: (data) => {
        return {
          method: "PATCH",
          url: `/api/company-request/reject`,
          data,
        };
      },
    }),
  }),
});

export const {
  useGetAllCompanyRequestQuery,
  useGetRequestDetailQuery,
  useCompanyRequestApproveMutation,
  useCompanyRequestRejectMutation,
} = companyRequestApi;
