"use client";
import { FC, useRef } from "react";
import UserAvatar from "@/components/UserAvatar";
import { Props } from "@/app/r/[slug]/post/[id]/components/Comment/types";
import { formatTimeToNow } from "@/lib/utils";
import CommentVotes from "@/app/r/[slug]/post/[id]/components/CommentVotes";

const Comment: FC<Props> = ({ comment }) => {
  const commentRef = useRef<HTMLDivElement>(null);

  const { votesAmount, id, currentVote, author, createdAt, text } = comment;
  const { name, image, username } = author;

  return (
    <div ref={commentRef} className="flex flex-col">
      <div className="flex items-center">
        <UserAvatar className="h-6 w-6" user={{ name, image }} />

        <div className="ml-2 flex items-center gap-x-2">
          <p className="text-sm font-medium text-gray-900">u/{username}</p>
          <p className="max-h-40 truncate text-xs text-zinc-500">
            {formatTimeToNow(new Date(createdAt))}
          </p>
        </div>
      </div>
      <p className="text-sm text-zinc-900 mt-2">{text}</p>
      <div className="flex gap-2 items-center">
        <CommentVotes
          commentId={id}
          initialVotesAmount={votesAmount}
          initialVote={currentVote}
        />
      </div>
    </div>
  );
};

export default Comment;
