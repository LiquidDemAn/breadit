"use client";
import { FC, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { VoteType } from "@prisma/client";
import { useApi } from "./useApi";
import { Props } from "./types";

const CommentsVotes: FC<Props> = ({
  commentId,
  initialVote,
  initialVotesAmount,
}) => {
  const [currentVote, setCurrentVote] = useState(initialVote);
  const [votesAmount, setVotesAmount] = useState(initialVotesAmount);
  const { mutate, isLoading } = useApi({
    currentVote,
    setVotesAmount,
    setCurrentVote,
  });

  const voteUpHandle = () => {
    mutate({ commentId, type: VoteType.UP });
  };

  const voteDownHandle = () => {
    mutate({ commentId, type: VoteType.DOWN });
  };

  return (
    <div className="flex gap-1">
      <Button
        onClick={voteUpHandle}
        size="sm"
        variant="ghost"
        aria-label="upvote"
        disabled={isLoading}
      >
        <ArrowBigUp
          className={cn("h-5 w-5 text-zinc-700", {
            "text-emerald-500 fill-emerald-500":
              currentVote?.type === VoteType.UP,
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
        disabled={isLoading}
      >
        <ArrowBigDown
          className={cn("h-5 w-5 text-zinc-700", {
            "text-red-500 fill-red-500": currentVote?.type === VoteType.DOWN,
          })}
        />
      </Button>
    </div>
  );
};

export default CommentsVotes;
