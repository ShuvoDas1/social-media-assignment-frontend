"use client";

import {
  useGetPostCommentsQuery,
  usePostCommentMutation,
} from "@/features/post/postApi";
import { useState } from "react";
import CommentItem from "./CommentItem";
import { toast } from "react-toastify";
import { GetPostCommentsResponse } from "@/features/post/postTypes";

interface CommentsModalProps {
  postId: number;
  isLoading: boolean;
  commentsRes: GetPostCommentsResponse | undefined;
  refetch: () => void;
}

export default function PostComments({
  postId,
  isLoading,
  commentsRes,
  refetch,
}: CommentsModalProps) {
  const [isReplayComment, setIsReplayComment] = useState<boolean>(false);
  const [replayData, setReplayData] = useState<{
    comment: string;
    parentId: number | null;
  }>({
    comment: "",
    parentId: null,
  });

  const [
    postComment,
    { isLoading: commentLoading, isSuccess: commentSuccess },
  ] = usePostCommentMutation();

  const handleReplySubmit = async () => {
    try {
      const res = await postComment({
        postId,
        comment: replayData.comment,
        parentId: replayData.parentId,
      }).unwrap();
      toast.success("commented successfully");
      setReplayData({
        comment: "",
        parentId: null,
      });
      refetch();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Failed to react to post");
    }
  };

  return (
    <>
      {isLoading
        ? "Loading Comment..."
        : commentsRes?.data?.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={postId}
              isReplayComment={isReplayComment}
              replayData={replayData}
              setIsReplayComment={setIsReplayComment}
              setReplayData={setReplayData}
              handleReplySubmit={handleReplySubmit}
            />
          ))}
    </>
  );
}
