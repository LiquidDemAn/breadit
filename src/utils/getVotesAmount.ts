import { Post, User, Vote, VoteType } from "@prisma/client";

export const getVotesAmount = (
  post: (Post & { votes: Vote[]; author: User }) | null,
) => {
  return (
    post?.votes.reduce((acc, cur) => {
      if (cur.type === VoteType.UP) {
        return acc + 1;
      }

      if (cur.type === VoteType.DOWN) {
        return acc - 1;
      }

      return acc;
    }, 0) || 0
  );
};
