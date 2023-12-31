import React from "react";
import { Props } from "./types";
import { getCommentsData } from "@/app/r/[slug]/post/[id]/components/Comments/utils";
import Comment from "@/app/r/[slug]/post/[id]/components/Comment";
import CreateComment from "@/app/r/[slug]/post/[id]/components/CreateComment";

const Comments = async ({ postId }: Props) => {
  const { topLevelComments } = await getCommentsData(postId);

  return (
    <div className="flex flex-col gap-y-4 mt-4">
      <hr className="w-full h-px my-6" />

      <CreateComment postId={postId} />

      <div className="flex flex-col gap-y-6 mt-4">
        {topLevelComments.map((comment) => (
          <div key={comment.id} className="flex flex-col">
            <div className="mb-2">
              <Comment comment={comment} />

              {comment.replies && (
                <div className="ml-2">
                  {comment.replies.map((reply) => (
                    <div
                      className="py-2 my-1 pl-4 border-l-2 border-zinc-200"
                      key={reply.id}
                    >
                      <Comment comment={reply} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
