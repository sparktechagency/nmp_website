import { baseApi } from "@/redux/api/baseApi";

const SubscribeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sentSbuscribe: builder.mutation({
      query: (data) => ({
        url: "/newsletter/subscribe",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscribe"],
    }),

    privacyPolicy: builder.query({
      query: () => ({
        url: "/policy/get-policy-by-type/terms-condition",
        method: "GET",
      }),
      providesTags: ["PrivacyPolicy"],
    }),

    aboutUs: builder.query({
      query: () => ({
        url: "/policy/get-policy-by-type/about-us",
        method: "GET",
      }),
      providesTags: ["AboutUs"],
    }),
    getDelivaryInformation: builder.query({
      query: () => ({
        url: "/information/get-information",
        method: "GET",
      }),
      providesTags: ["delivaryInformation"],
    }),
  }),
});

export const {
  useSentSbuscribeMutation,
  usePrivacyPolicyQuery,
  useAboutUsQuery,
  useGetDelivaryInformationQuery,
} = SubscribeApi;
