import { baseApi } from "@/redux/api/baseApi";

const CartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/cart/create-cart",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddToCartMutation } = CartApi;
