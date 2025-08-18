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
  }),
});

export const { useSentSbuscribeMutation, usePrivacyPolicyQuery } = SubscribeApi;
