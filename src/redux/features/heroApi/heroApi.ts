import { baseApi } from "@/redux/api/baseApi";

const HeroAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanner: builder.query({
      query: () => ({
        url: "/information/get-information",
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),
  }),
});

export const { useGetBannerQuery } = HeroAPi;
