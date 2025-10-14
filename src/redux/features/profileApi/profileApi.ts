/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

interface Profile {
  data: any;
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const ProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, void>({
      query: () => ({
        url: "/user/get-my-profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/update-my-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    updateProfileImage: builder.mutation({
      query: (data) => ({
        url: "/user/update-profile-img",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    conatctUs: builder.mutation({
      query: (data) => ({
        url: "/contact/create-contact",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ContactUs"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateProfileImageMutation,
  useConatctUsMutation,

} = ProfileApi;
