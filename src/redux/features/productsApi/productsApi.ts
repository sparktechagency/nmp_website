import { baseApi } from "@/redux/api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        page,
        limit,
        searchTerm,
        categoryId,
        flavorId,
        brandId,
        typedId,
      }) => ({
        url: `/product/get-user-products?searchTerm=${searchTerm}&page=${page}&limit=${limit}&categoryId=${categoryId}&flavorId=${flavorId}&brandId=${brandId}&typeId=${typedId}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    // getProducts: builder.query({
    //   query: ({ page, limit, searchTerm,id}) => ({
    //     url: `/product/get-user-products?typeId=${id}&searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Products"],
    // }),

    getFeatureProducts: builder.query({
      query: () => ({
        url: "/product/get-feature-products",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    getBestSellerProduct: builder.query({
      query: () => ({
        url: "/product/get-best-seller-products",
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

    getProductType: builder.query({
      query: () => ({
        url: "/type/get-type-drop-down",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useGetFeatureProductsQuery,
  useGetBestSellerProductQuery,
  useGetProductTypeQuery,
} = productsApi;
