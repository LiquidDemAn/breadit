"use client";
import { FC, useState } from "react";
import { Props } from "@/components/PostVotesClient/types";
import { Button } from "@/components/ui/Button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { VoteType } from "@prisma/client";
import { useApi } from "@/components/PostVotesClient/useApi";

const PostVoteClient: FC<Props> = ({
  postId,
  initialVote,
  initialVotesAmount,
}) => {
  const [currentVote, setCurrentVote] = useState(initialVote);
  const [votesAmount, setVotesAmount] = useState(initialVotesAmount);
  const { mutate } = useApi({ currentVote, setVotesAmount, setCurrentVote });

  const voteUpHandle = () => {
    mutate({ postId, voteType: VoteType.UP });
  };

  const voteDownHandle = () => {
    mutate({ postId, voteType: VoteType.DOWN });
  };

  return (
    <div className="flex sm:flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
      <Button
        onClick={voteUpHandle}
        size="sm"
        variant="ghost"
        aria-label="upvote"
      >
        <ArrowBigUp
          className={cn("h-5 w-5 text-zinc-700", {
            "text-emerald-500 fill-emerald-500":
              currentVote?.voteType === VoteType.UP,
          })}
        />
      </Button>

      <p className="text-center py-2 font-medium text-sm text-zinc-900">
        {votesAmount}
      </p>

      <Button
        onClick={voteDownHandle}
        size="sm"
        variant="ghost"
        aria-label="downvote"
      >
        <ArrowBigDown
          className={cn("h-5 w-5 text-zinc-700", {
            "text-red-500 fill-red-500":
              currentVote?.voteType === VoteType.DOWN,
          })}
        />
      </Button>
    </div>
  );
};

export default PostVoteClient;