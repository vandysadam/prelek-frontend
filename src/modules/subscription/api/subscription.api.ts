import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "../../api/api.query";
import { BaseResponse, PaginationResponse } from "../../api/api.types";
import { SubscriptionFilterRequest } from "../dtos/requests/subscription-filter.dto";
import { Subscription } from "../entities/subscription.entity";

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getAllSubscription: builder.query<
      PaginationResponse<Subscription[]>,
      SubscriptionFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/subscriptions/all-subs",
          params: data,
        };
      },
    }),
    getMySubscription: builder.query<
      PaginationResponse<Subscription[]>,
      SubscriptionFilterRequest
    >({
      query: (data) => {
        return {
          method: "GET",
          url: "/api/subscriptions/my-subs",
          params: data,
        };
      },
    }),
    getSubscriptionDetail: builder.query<
      BaseResponse<Subscription>,
      { id: string }
    >({
      query: (data) => {
        return {
          method: "GET",
          url: `/api/subscriptions/${data.id}`,
        };
      },
    }),
  }),
});

export const {
  useGetAllSubscriptionQuery,
  useGetMySubscriptionQuery,
  useGetSubscriptionDetailQuery,
} = subscriptionApi;
