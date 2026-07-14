// components/CommentItem.tsx
import React from "react";
import CommentInput from "./CommentInput";
import { Comment } from "@/features/post/postTypes";
import { useCommentReactionMutation } from "@/features/post/postApi";
import { toast } from "react-toastify";

interface CommentItemProps {
  comment: Comment;
  postId: number;
  isReplayComment: boolean;
  replayData: any;
  setIsReplayComment: React.Dispatch<React.SetStateAction<boolean>>;
  setReplayData: React.Dispatch<React.SetStateAction<any>>;
  handleReplySubmit: (...args: any[]) => void;
  depth?: number;
}

const CommentItem = ({
  comment,
  postId,
  isReplayComment,
  replayData,
  setIsReplayComment,
  setReplayData,
  handleReplySubmit,
  depth = 0,
}: CommentItemProps) => {
  const [commentReaction] = useCommentReactionMutation();

  const handleCommentReaction = async (react: string) => {
    try {
      const res = await commentReaction({
        commentId: comment.id,
        react,
      }).unwrap();
      toast.success("Comment reacted successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Failed to react to comment");
    }
  };

  return (
    <div className="_comment_main" style={{ marginLeft: depth ? 40 : 0 }}>
      <div className="_comment_image">
        <a href="/profile" className="_comment_image_link">
          <img
            src="/assets/images/txt_img.png"
            alt=""
            className="_comment_img1"
          />
        </a>
      </div>
      <div className="_comment_area">
        <div className="_comment_details">
          <div className="_comment_details_top">
            <div className="_comment_name">
              <a href="profile.html ">
                <h4 className="_comment_name_title">
                  {comment?.user?.full_name}
                </h4>
              </a>
            </div>
          </div>
          <div className="_comment_status">
            <p className="_comment_status_text">
              <span>{comment?.comment}</span>
            </p>
          </div>
          <div className="_total_reactions">
            <div className="_total_react">
              <span className="_reaction_like">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-thumbs-up"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </span>
              <span className="_reaction_heart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-heart"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </span>
            </div>
            <span className="_total">{comment?.like_count}</span>
          </div>
          <div className="_comment_reply">
            <div className="_comment_reply_num">
              <ul className="_comment_reply_list">
                <li
                  onClick={() =>
                    handleCommentReaction(comment?.is_liked ? "unlike" : "like")
                  }
                >
                  <span>{comment?.is_liked ? "Unlike" : "Like"}</span>
                </li>
                <li
                  onClick={() => {
                    setIsReplayComment((prev) => !prev);
                    setReplayData((prev: any) => ({
                      ...prev,
                      parentId: comment.id,
                    }));
                  }}
                >
                  <span>Reply.</span>
                </li>
                <li>
                  <span>Share</span>
                </li>
                <li>
                  <span className="_time_link">.21m</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {isReplayComment && comment.id === replayData.parentId && (
          <CommentInput
            postId={postId}
            commentData={replayData}
            setComment={(comment) => setReplayData({ ...replayData, comment })}
            handleCommentSubmit={handleReplySubmit}
          />
        )}

        {comment?.replies?.length > 0 &&
          comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postId={postId}
              isReplayComment={isReplayComment}
              replayData={replayData}
              setIsReplayComment={setIsReplayComment}
              setReplayData={setReplayData}
              handleReplySubmit={handleReplySubmit}
              depth={depth + 1}
            />
          ))}
      </div>
    </div>
  );
};

export default CommentItem;
