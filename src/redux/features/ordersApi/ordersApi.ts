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
    verifySession: builder.query({
      query: ({ session }) => ({
        url: `/order/verify-session?sessionId=${session}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
  }),
});
export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useVerifySessionQuery,
} = OrdersApi;
