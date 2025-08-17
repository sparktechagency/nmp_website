import { baseApi } from "@/redux/api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/product/get-user-products",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
