import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBaseQuery } from '../../../api/api.query';
import { BaseResponse, PaginationResponse } from '../../../api/api.types';
import { CompanyFilterRequest } from '../dtos/requests/company-filter.request';
import { GetCompanyNameAndIdFilterRequest } from '../dtos/requests/get-company-name-and-id-filter.request';
import { CompanyRejectRequest } from '../dtos/requests/reject-company.request';
import { CompanyNameAndIdResponse } from '../dtos/resposne/get-company-name-and-id.response';
import { Company } from '../entities/company.entity';

export const companyApi = createApi({
  reducerPath: 'companyApi',
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    createCompany: builder.mutation<BaseResponse<Company>, Company>({
      query: (data) => {
        return {
          method: 'POST',
          url: '/api/company',
          data
        };
      }
    }),
    getAllUserCompanyPaginated: builder.query<PaginationResponse<Company[]>, CompanyFilterRequest>({
      query: (data) => {
        return {
          method: 'GET',
          url: '/api/company/get-user-company',
          params: data
        };
      }
    }),
    approveCompany: builder.mutation<BaseResponse<Company>, { id: string }>({
      query: (data) => {
        return {
          method: 'PUT',
          url: `/api/company/approve-company/${data.id}`,
          data
        };
      }
    }),
    rejectCompany: builder.mutation<BaseResponse<Company>, CompanyRejectRequest>({
      query: (data) => {
        return {
          method: 'PUT',
          url: `/api/company/reject-company/${data.id}`,
          data
        };
      }
    }),
    getCompanyDetail: builder.query<BaseResponse<Company>, { id: string }>({
      query: (data) => {
        return {
          method: 'GET',
          url: `/api/company/${data.id}`
        };
      }
    }),
    getCompanyNameAndId: builder.query<
      BaseResponse<CompanyNameAndIdResponse[]>,
      GetCompanyNameAndIdFilterRequest
    >({
      query: (data) => {
        return {
          method: 'GET',
          url: `/api/company/get-company-name-and-id`
        };
      }
    }),
    updateCompany: builder.mutation<BaseResponse<Company>, Company>({
      query: (data) => {
        return {
          method: 'PUT',
          url: `/api/company/${data._id}`,
          data
        };
      }
    }),
    updateCompanySettings: builder.mutation<BaseResponse<Company>, Company>({
      query: (data) => {
        return {
          method: 'PUT',
          url: `/api/company/update`,
          data
        };
      }
    }),
    deleteCompany: builder.mutation<BaseResponse<Company>, { id: string }>({
      query: (data) => {
        return {
          method: 'DELETE',
          url: `/api/company/${data.id}`
        };
      }
    })
  })
});

export const {
  useGetAllUserCompanyPaginatedQuery,
  useGetCompanyDetailQuery,
  useGetCompanyNameAndIdQuery,
  useCreateCompanyMutation,
  useApproveCompanyMutation,
  useRejectCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useLazyGetCompanyDetailQuery,
  useUpdateCompanySettingsMutation
} = companyApi;
