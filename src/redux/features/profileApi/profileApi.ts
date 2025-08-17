import { baseApi } from "@/redux/api/baseApi";

interface Profile {
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
  }),
});

export const { useGetProfileQuery } = ProfileApi;
