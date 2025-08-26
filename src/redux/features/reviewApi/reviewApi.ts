import { baseApi } from "@/redux/api/baseApi";

const ReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReview: builder.query({
      query: (id: string) => ({
        url: `/review/get-user-product-reviews/${id}`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: "/review/create-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const { useGetAllReviewQuery, useCreateReviewMutation } = ReviewApi;
