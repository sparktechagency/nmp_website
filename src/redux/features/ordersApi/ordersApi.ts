import { baseApi } from "@/redux/api/baseApi";

const OrdersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/order/get-user-orders",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/create-order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});
export const { useGetOrdersQuery, useCreateOrderMutation } = OrdersApi;
