import { baseApi } from "@/redux/api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, limit, searchTerm }) => ({
        url: `/product/get-user-products?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    getSingleProduct: builder.query({
      query: (_id) => ({
        url: `/product/get-single-product/${_id}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductQuery } = productsApi;
