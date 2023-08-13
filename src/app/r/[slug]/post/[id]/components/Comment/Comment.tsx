"use client";
import React, { FC, useRef } from "react";
import UserAvatar from "@/components/UserAvatar";
import { Props } from "@/app/r/[slug]/post/[id]/components/Comment/types";
import { formatTimeToNow } from "@/lib/utils";

const Comment: FC<Props> = ({ comment }) => {
  const commentRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={commentRef} className="flex flex-col">
      <div className="flex items-center">
        <UserAvatar
          className="h-6 w-6"
          user={{ name: comment.author?.name, image: comment.author?.image }}
        />

        <div className="ml-2 flex items-center gap-x-2">
          <p className="text-sm font-medium text-gray-900">
            u/{comment.author?.username}
          </p>
          <p className="max-h-40 truncate text-xs text-zinc-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>
      <p className="text-sm text-zinc-900 mt-2">{comment.text}</p>
    </div>
  );
};

export default Comment;
