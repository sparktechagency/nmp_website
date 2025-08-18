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
  }),
});
export const { useGetOrdersQuery } = OrdersApi;
