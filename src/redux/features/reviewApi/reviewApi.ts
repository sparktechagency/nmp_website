import { baseApi } from "@/redux/api/baseApi";

const ReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReview: builder.query({
      query: () => ({
        url: "/review/get-user-product-reviews/689b1c4e596f00690cdebb2d",
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
  }),
});

export const { useGetAllReviewQuery } = ReviewApi;
