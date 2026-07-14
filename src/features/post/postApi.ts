import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  PostRequest,
  GetPostsResponse,
  GetPostReactionsResponse,
  GetPostCommentsResponse,
} from "./postTypes";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const postApi = createApi({
  reducerPath: "postApi",
  tagTypes: ["Posts", "Reactions", "Comments"],
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createPost: builder.mutation<any, PostRequest>({
      query: (credentials) => {
        const formData = new FormData();
        formData.append("content", credentials.content);
        formData.append("visibility", credentials.privacy);
        credentials.images.forEach((image) => {
          formData.append("images[]", image);
        });

        return {
          url: "/posts/store",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Posts"],
    }),
    getPosts: builder.query<GetPostsResponse, void>({
      query: () => {
        return {
          url: "/posts",
          method: "GET",
        };
      },
      providesTags: ["Posts"],
    }),
    postReaction: builder.mutation<any, { postId: number; react: string }>({
      query: ({ postId, react }) => {
        return {
          url: `/posts/${postId}/reaction`,
          method: "POST",
          body: { react },
        };
      },
      invalidatesTags: ["Posts"],
    }),
    getPostReactions: builder.query<
      GetPostReactionsResponse,
      { postId: number }
    >({
      query: ({ postId }) => {
        return {
          url: `/posts/${postId}/reactions`,
          method: "GET",
        };
      },
      providesTags: ["Reactions"],
    }),
    postComment: builder.mutation<
      any,
      { postId: number; comment: string; parentId?: number | null }
    >({
      query: ({ postId, comment, parentId }) => {
        return {
          url: `/posts/${postId}/comment`,
          method: "POST",
          body: { comment, parent_id: parentId },
        };
      },
      invalidatesTags: ["Comments"],
    }),
    getPostComments: builder.query<GetPostCommentsResponse, { postId: number }>(
      {
        query: ({ postId }) => {
          return {
            url: `/posts/${postId}/comments`,
            method: "GET",
          };
        },
        providesTags: ["Comments"],
      },
    ),

    commentReaction: builder.mutation<
      any,
      { commentId: number; react: string }
    >({
      query: ({ commentId, react }) => {
        return {
          url: `/posts/comments/${commentId}/reaction`,
          method: "POST",
          body: { react },
        };
      },
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useLazyGetPostsQuery,
  usePostReactionMutation,
  useGetPostReactionsQuery,
  usePostCommentMutation,
  useGetPostCommentsQuery,
  useCommentReactionMutation,
} = postApi;

export default postApi;
