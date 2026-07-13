"use client";

import { useGetPostReactionsQuery } from "@/features/post/postApi";
import { useEffect } from "react";

interface LikesModalProps {
  show: boolean;
  onClose: () => void;
  postId: number;
}

export default function LikesModal({ show, onClose, postId }: LikesModalProps) {
  const {
    data: reactionsRes,
    isLoading,
    error,
  } = useGetPostReactionsQuery({ postId });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (show) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onClick={onClose}
      tabIndex={-1}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Liked by</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div
            className="modal-body"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            {isLoading ? (
              <p className="text-center text-muted mb-0">Loading...</p>
            ) : reactionsRes?.data?.length === 0 ? (
              <p className="text-center text-muted mb-0">No reactions yet</p>
            ) : (
              <ul className="list-unstyled mb-0">
                {reactionsRes?.data?.map((reaction) => (
                  <li
                    key={reaction?.id}
                    className="d-flex justify-content-between align-items-center gap-2 py-2 border-bottom"
                  >
                    <img
                      src={"/assets/images/comment_img.png"}
                      alt={reaction?.user?.name}
                      width={20}
                      height={20}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <span className="fw-medium">{reaction.user.name}</span>
                    {reaction.react && (
                      <span className="ms-auto">
                        {reaction.react === "like" && "👍"}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
