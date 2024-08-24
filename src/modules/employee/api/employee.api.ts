import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../api/api.types";
import { Company } from "../../company/company/entities/company.entity";
import { CreateEmployeeDto } from "../dtos/requests/create-employee.request";
import { EmployeeFilterRequest } from "../dtos/requests/employee-filter.request";
import { UpdateEmployeeDto } from "../dtos/requests/update-employee.request";
import { Employee } from "../entities/employee.entity";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    createEmployee: builder.mutation<BaseResponse<Employee>, CreateEmployeeDto>(
      {
        query: (data) => {
          return {
            method: "POST",
            url: "/api/employees",
            data,
          };
        },
      }
    ),
    getEmployees: builder.query<
      PaginationResponse<Employee[]>,
      EmployeeFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/employees/list",
          params: data,
        };
      },
    }),
    findAllEmployee: builder.query<
      PaginationResponse<Employee[]>,
      EmployeeFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/employees/find-all",
          params: data,
        };
      },
    }),
    updateEmployee: builder.mutation<BaseResponse<Employee>, UpdateEmployeeDto>(
      {
        query: (data) => {
          return {
            method: "PATCH",
            url: `/api/employees`,
            data,
          };
        },
      }
    ),
    deleteEmployee: builder.mutation<BaseResponse<Company>, { id: string }>({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/api/employees/${data.id}`,
        };
      },
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useFindAllEmployeeQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
