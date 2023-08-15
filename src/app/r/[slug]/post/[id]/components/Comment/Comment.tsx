"use client";
import { FC, useRef, useState } from "react";
import UserAvatar from "@/components/UserAvatar";
import { Props } from "@/app/r/[slug]/post/[id]/components/Comment/types";
import { formatTimeToNow } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { PathsEnum } from "@/configs/constants";
import { useUserSession } from "@/utils/useUserSession";
import CreateComment from "@/app/r/[slug]/post/[id]/components/CreateComment";
import { getVotesAmount } from "@/utils/getVotesAmount";
import { getCurrentVote } from "@/utils/getCurrentVote";
import Votes from "@/components/Votes";
import { ComponentTypeEnum } from "@/components/Votes/types";

const Comment: FC<Props> = ({ comment }) => {
  const router = useRouter();
  const session = useUserSession();
  const commentRef = useRef<HTMLDivElement>(null);
  const [isReplaying, setIsReplaying] = useState(false);

  const votesAmount = getVotesAmount(comment.votes);
  const currentVote = getCurrentVote(comment.votes, session);

  const { id, author, createdAt, text, postId } = comment;
  const { name, image, username } = author;

  const onReplyOpen = () => {
    if (!session) {
      router.push(PathsEnum.SIGNIN);
    }
    setIsReplaying(!isReplaying);
  };

  const onReplyCancel = () => {
    setIsReplaying(false);
  };

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
        <Votes
          id={id}
          initialVote={currentVote}
          initialVotesAmount={votesAmount || 0}
          componentType={ComponentTypeEnum.COMMENT}
        />

        {!comment.replyToId && (
          <Button onClick={onReplyOpen} variant="ghost" size="xs">
            <MessageSquare className="h-4 w-4 mr-1.5" />
            Reply
          </Button>
        )}
      </div>

      {isReplaying && (
        <div className="mt-4">
          <CreateComment
            replyToId={id}
            postId={postId}
            onCancel={onReplyCancel}
            setIsReplaying={setIsReplaying}
          />
        </div>
      )}
    </div>
  );
};

export default Comment;
