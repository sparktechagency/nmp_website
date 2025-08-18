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
  }),
});

export const { useSentSbuscribeMutation } = SubscribeApi;
