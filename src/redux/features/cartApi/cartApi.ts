import { baseApi } from "@/redux/api/baseApi";

const CartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/cart/create-cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    getCart: builder.query({
      query: () => ({
        url: "/cart/get-carts",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    updateCart: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/cart/update-cart/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    deleteCart: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/cart/delete-cart/${_id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
} = CartApi;
