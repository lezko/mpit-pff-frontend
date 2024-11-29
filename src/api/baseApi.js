import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const MISHA = "192.168.174.242";
const EGOR = "192.168.174.110";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${EGOR}:8080`,
    mode: "cors",
  }),
  endpoints: (builder) => ({
    getFeeds: builder.query({
      query: () => "/file",
      providesTags: () => ["FEEDS"],
    }),
    getFeedColumnsNames: builder.query({
      // query: ({ feedId }) => `/file/${feedId}/titles`,
      queryFn: ({ feedId }) => ({ data: ["1", "2", "3", "4", "5"] }),
    }),
    getFeedData: builder.query({
      query: ({ feedId, page }) => `/file/${feedId}/${page}`,
    }),
    getFeedErrors: builder.query({
      query: ({ feedId }) => `/error/${feedId}`,
    }),
    getFeedPagesCount: builder.query({
      query: ({ feedId }) => `/file/${feedId}/pages`,
    }),
    addFeed: builder.mutation({
      query: ({ url }) => ({
        url: "/file/link",
        method: "POST",
        body: { link: url },
      }),
      invalidatesTags: () => ["FEEDS"],
    }),
  }),
});

export const {
  useGetFeedsQuery,
  useGetFeedDataQuery,
  useGetFeedColumnsNamesQuery,
  useLazyGetFeedDataQuery,
  useLazyGetFeedErrorsQuery,
  useAddFeedMutation,
  useLazyGetFeedPagesCountQuery,
} = baseApi;
