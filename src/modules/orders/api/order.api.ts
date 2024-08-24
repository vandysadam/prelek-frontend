import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../api/api.types";
import { RajaOngkirWaybillModel } from "../../rajaongkir/entity/rajaongkir-waybill.model";
import { Order } from "../dtos/models/order.entity";
import { ConfirmOrderRequest } from "../dtos/requests/confirm-order.request";
import { OrderFilterRequest } from "../dtos/requests/order-filter.request";
import { RajaOngkirWaybillRequest } from "../dtos/requests/rajaongkir-waybill-request";
import { RejectOrderRequest } from "../dtos/requests/reject-order.request";
import { SendOrderRequest } from "../dtos/requests/send-order.request";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    createUser: builder.mutation<BaseResponse<Order>, Order>({
      query: (data) => {
        return {
          method: "POST",
          url: "/api/users",
          data,
        };
      },
    }),
    confrimOrder: builder.mutation<BaseResponse<Order>, ConfirmOrderRequest>({
      query: (data) => {
        return {
          method: "PUT",
          url: "/api/order/confirm-order",
          data,
        };
      },
    }),
    sendOrder: builder.mutation<BaseResponse<Order>, SendOrderRequest>({
      query: (data) => {
        return {
          method: "PUT",
          url: "/api/order/send-order",
          data,
        };
      },
    }),
    rejectOrder: builder.mutation<BaseResponse<Order>, RejectOrderRequest>({
      query: (data) => {
        return {
          method: "PUT",
          url: "/api/order/reject-order",
          data,
        };
      },
    }),
    getAllOrders: builder.query<
      PaginationResponse<Order[]>,
      OrderFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/order/order-list",
          params: data,
        };
      },
    }),
    getOrderDetail: builder.query<BaseResponse<Order>, { orderId: string }>({
      query: (data) => {
        return {
          method: "GET",
          url: `/api/order/${data.orderId}`,
          params: data,
        };
      },
    }),
    // validate tracking number, and position / send status of the order
    traceOrder: builder.mutation<
      BaseResponse<RajaOngkirWaybillModel>,
      RajaOngkirWaybillRequest
    >({
      query: (data) => {
        return {
          method: "POST",
          url: "/api/rajaongkir/trace",
          data,
        };
      },
    }),
  }),
});

export const {
  useCreateUserMutation,
  useConfrimOrderMutation,
  useSendOrderMutation,
  useRejectOrderMutation,
  useTraceOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderDetailQuery,
} = orderApi;
