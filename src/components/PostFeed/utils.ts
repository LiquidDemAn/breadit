import { ExtendedPost } from "@/components/PostFeed/types";
import { VoteType } from "@prisma/client";
import { UserSessionType } from "@/types/common";

export const getVotesData = (post: ExtendedPost, session: UserSessionType) => {
  const votesAmt = post.votes.reduce((acc, cur) => {
    if (cur.type === VoteType.UP) {
      return acc + 1;
    }

    if (cur.type === VoteType.DOWN) {
      return acc - 1;
    }

    return acc;
  }, 0);

  const isVoted = post.votes.filter((vote) => vote.userId === session?.user.id);

  return {
    votesAmt,
    isVoted,
  };
};
