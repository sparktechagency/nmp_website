import { baseApi } from "@/redux/api/baseApi";

const CategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCatDropDown: builder.query({
      query: () => ({
        url: "/category/get-category-drop-down",
        method: "Get",
      }),
      providesTags: ["Categories"],
    }),
    getBrandDropDown: builder.query({
      query: () => ({
        url: "/brand/get-brand-drop-down",
        method: "Get",
      }),
      providesTags: ["Brand"],
    }),
    getFlavourDropDown: builder.query({
      query: () => ({
        url: "/flavor/get-flavor-drop-down",
        method: "Get",
      }),
      providesTags: ["Flavour"],
    }),
  }),
});

export const {
  useGetCatDropDownQuery,
  useGetBrandDropDownQuery,
  useGetFlavourDropDownQuery,
} = CategoryApi;
