import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { message } from "antd";
import { BASE_URL } from "@/app/utils/baseUrl";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state?.auth?.token || localStorage.getItem("token");
    // console.log("token from baseAPI", token);

    if (token) {
      headers.set("Authorization", `${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const status = result.error.status;
    const errorData = (result.error.data as { message?: string }) || {};
    const errorMessage = errorData.message || "Something went wrong";

    if (status === 500) {
      message.error(errorMessage);
    }
    if (status === 404) {
      message.error(errorMessage);
    }
    if (status === 403) {
      message.error(errorMessage);
    }
    // If you want to include 400 (Bad Request):
    // if (status === 400) {
    //   message.error(errorMessage);
    // }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "Profile",
    "Products",
    "Review",
    "Categories",
    "Brand",
    "Flavour",
    "Orders",
    "Subscribe",
    "ContactUs",
    "PrivacyPolicy",
    "Cart",
    "AboutUs",
  ],
  endpoints: () => ({}),
});
